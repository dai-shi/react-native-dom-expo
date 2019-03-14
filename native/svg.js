import { RCTView, RCTViewManager, RCTEvent } from 'react-native-dom';
import { normalizeInputEventName } from 'react-native-dom/lib/bridge/RCTEventDispatcher';
import RCTPropTypes from 'react-native-dom/lib/views/RCTPropTypes';

const setAttributePreserveAspectRatio = (ele, name, value) => {
  const current = ele.getAttribute('preserveAspectRatio') || '';
  const parts = current.split(' ');
  parts[0] = parts[0] || 'none';
  parts[1] = parts[1] || 'meet';
  if (name === 'align') parts[0] = value;
  if (name === 'meetOrSlice') parts[1] = ['meet', 'slice'][value];
  ele.setAttribute('preserveAspectRatio', parts.join(' '));
};

const setAttributeViewBox = (ele, name, value) => {
  const current = ele.getAttribute('viewBox') || '';
  const index = ['minX', 'minY', 'vbWidth', 'vbHeight'].indexOf(name);
  const parts = current.split(' ');
  const newParts = [0, 1, 2, 3].map(i => (i === index ? value : parts[i] || 0));
  ele.setAttribute('viewBox', newParts.join(' '));
};

const setAttributeVectorEffect = (ele, value) => {
  const vectorEffects = ['default', 'non-scaling-stroke', 'inherit'];
  ele.setAttribute('vector-effect', vectorEffects[value]);
};

const parseMatrix = v => v && `matrix(${v.join(',')})`;

const parseBrush = (a) => {
  if (!a) return a;
  if (a[0] === 1) return a[1];
  return '#' + a.slice(1, 4).map(x => ('0' + (x * 255).toString(16)).slice(-2)).join('');
};

const createSetter = (name, attr) => (view, value) => {
  if (['align', 'meetOrSlice'].includes(name)) {
    setAttributePreserveAspectRatio(view.domElement, name, value);
  } else if (name === 'vectorEffect') {
    setAttributeVectorEffect(view.domElement, value);
  } else if (['minX', 'minY', 'vbWidth', 'vbHeight'].includes(name)) {
    setAttributeViewBox(view.domElement, name, value);
  } else {
    let n = attr || name;
    let v = value;
    if (name === 'name') n = 'id';
    if (name === 'bbWidth') n = 'width';
    if (name === 'bbHeight') n = 'height';
    if (name === 'stroke') v = parseBrush(v);
    if (name === 'fill') v = parseBrush(v);
    if (name === 'matrix') { n = 'transform'; v = parseMatrix(value); }
    if (name === 'strokeDasharray') v = value && value.join(' ');
    if (v === null) {
      view.domElement.removeAttribute(n);
    } else {
      view.domElement.setAttribute(n, v);
    }
  }
};

const createManager = (eleName, svgName, propDefs) => {
  const Event = class Event implements RCTEvent {
    static displayName = 'RNSVG' + eleName + 'Event';

    constructor(eventName, reactTag, payload) {
      this.eventName = eventName;
      this.viewTag = reactTag;
      this.payload = payload;
    }

    canCoalesce() {
      return false;
    }

    coalesceWithEvent() {}

    moduleDotMethod() {
      return 'RCTEventEmitter.receiveEvent';
    }

    arguments() {
      return [
        this.viewTag,
        normalizeInputEventName(this.eventName),
        this.payload,
      ];
    }
  };

  const View = class View extends RCTView {
    static displayName = 'RNSVG' + eleName;

    constructor(bridge) {
      super(bridge);
      this.domElement = document.createElementNS('http://www.w3.org/2000/svg', svgName);
      if (svgName === 'svg') {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(this.domElement);
        this.domElementAttached = true;
      }
    }

    insertReactSubviewAtIndex(subview, index) {
      super.insertReactSubviewAtIndex(subview, index);
      if (subview.domElement && !subview.domElementAttached) {
        if (index === this.reactSubviews.length) {
          this.domElement.appendChild(subview.domElement);
        } else {
          const beforeElement = this.domElement.childNodes[index];
          this.domElement.insertBefore(subview.domElement, beforeElement);
        }
        subview.domElementAttached = true;
      }
    }

    sendEvent(name, payload) {
      this.bridge.eventDispatcher.sendEvent(new Event(name, this.reactTag, payload));
    }
  };

  customElements.define('expo-svg-' + svgName.toLowerCase(), View);

  return class Manager extends RCTViewManager {
    static displayName = 'RNSVG' + eleName + 'Manager';

    static moduleName = 'RNSVG' + eleName + 'Manager';

    view() {
      return new View(this.bridge);
    }

    describeProps() {
      const d = super.describeProps();
      propDefs.forEach(({ name, type, attr }) => {
        if (type === RCTPropTypes.RCTDirectEventBlock) {
          // TODO
        } else {
          d.addProp(name, type, createSetter(name, attr), false);
        }
      });
      return d;
    }
  };
};

const TOUCHABLE_PROP_DEFS = [
  { name: 'onResponderMove', type: RCTPropTypes.RCTDirectEventBlock },
  { name: 'onResponderGrant', type: RCTPropTypes.RCTDirectEventBlock },
  { name: 'onResponderRelease', type: RCTPropTypes.RCTDirectEventBlock },
  { name: 'onResponderTerminate', type: RCTPropTypes.RCTDirectEventBlock },
  { name: 'onStartShouldSetResponder', type: RCTPropTypes.RCTDirectEventBlock },
  { name: 'onResponderTerminationRequest', type: RCTPropTypes.RCTDirectEventBlock },
];

const RESPONDER_PROP_DEFS = [
  { name: 'pointerEvents', type: RCTPropTypes.string },
];

const NODE_PROP_DEFS = [
  { name: 'name', type: RCTPropTypes.string },
  { name: 'opacity', type: RCTPropTypes.number },
  { name: 'matrix', type: RCTPropTypes.string },
  { name: 'mask', type: RCTPropTypes.string },
  { name: 'clipRule', type: RCTPropTypes.string, attr: 'clip-rule' },
  { name: 'clipPath', type: RCTPropTypes.string, attr: 'clip-path' },
  { name: 'onLayout', type: RCTPropTypes.RCTDirectEventBlock },
];

const RENDERABLE_PROP_DEFS = [
  ...NODE_PROP_DEFS,
  ...TOUCHABLE_PROP_DEFS,
  ...RESPONDER_PROP_DEFS,
  { name: 'fill', type: RCTPropTypes.string },
  { name: 'fillOpacity', type: RCTPropTypes.number, attr: 'fill-opacity' },
  { name: 'fillRule', type: RCTPropTypes.number, attr: 'fill-rule' },
  { name: 'stroke', type: RCTPropTypes.string },
  { name: 'strokeOpacity', type: RCTPropTypes.number, attr: 'stroke-opacity' },
  { name: 'strokeWidth', type: RCTPropTypes.number, attr: 'stroke-width' },
  { name: 'strokeLinecap', type: RCTPropTypes.string, attr: 'stroke-linecap' },
  { name: 'strokeLinejoin', type: RCTPropTypes.string, attr: 'stroke-linejoin' },
  { name: 'strokeMiterlimit', type: RCTPropTypes.number, attr: 'stroke-miterlimit' },
  { name: 'strokeDasharray', type: RCTPropTypes.array, attr: 'stroke-dasharray' },
  { name: 'strokeDashoffset', type: RCTPropTypes.number, attr: 'stroke-dashoffset' },
  { name: 'vectorEffect', type: RCTPropTypes.number, attr: 'vector-effect' },
];

const GROUP_PROP_DEFS = [
  ...RENDERABLE_PROP_DEFS,
  { name: 'fontData', type: RCTPropTypes.string, attr: 'font' },
  { name: 'fontStyle', type: RCTPropTypes.string, attr: 'font-style' },
  { name: 'fontWeight', type: RCTPropTypes.string, attr: 'font-weight' },
  { name: 'fontFamily', type: RCTPropTypes.string, attr: 'font-family' },
  { name: 'fontSize', type: RCTPropTypes.string, attr: 'font-size' },
];

const TEXT_PROP_DEFS = [
  ...GROUP_PROP_DEFS,
  { name: 'textAnchor', type: RCTPropTypes.string, attr: 'text-anchor' },
  { name: 'lengthAdjust', type: RCTPropTypes.string },
  { name: 'alignmentBaseline', type: RCTPropTypes.string, attr: 'alignment-baseline' },
  { name: 'dx', type: RCTPropTypes.number },
  { name: 'dy', type: RCTPropTypes.number },
  { name: 'x', type: RCTPropTypes.number },
  { name: 'y', type: RCTPropTypes.number },
  { name: 'rotate', type: RCTPropTypes.number },
  { name: 'textLength', type: RCTPropTypes.number },
  { name: 'baselineShift', type: RCTPropTypes.number, attr: 'baseline-shift' },
];

export default [
  createManager('Circle', 'circle', [
    ...RENDERABLE_PROP_DEFS,
    { name: 'cx', type: RCTPropTypes.number },
    { name: 'cy', type: RCTPropTypes.number },
    { name: 'r', type: RCTPropTypes.number },
  ]),
  createManager('ClipPath', 'clipPath', [
    ...RENDERABLE_PROP_DEFS,
    { name: 'cx', type: RCTPropTypes.number },
    { name: 'cy', type: RCTPropTypes.number },
    { name: 'r', type: RCTPropTypes.number },
  ]),
  createManager('Defs', 'defs', []),
  createManager('Ellipse', 'ellipse', [
    ...RENDERABLE_PROP_DEFS,
    { name: 'cx', type: RCTPropTypes.number },
    { name: 'cy', type: RCTPropTypes.number },
    { name: 'rx', type: RCTPropTypes.number },
    { name: 'ry', type: RCTPropTypes.number },
  ]),
  createManager('Group', 'g', GROUP_PROP_DEFS),
  createManager('Image', 'image', [
    ...RENDERABLE_PROP_DEFS,
    { name: 'x', type: RCTPropTypes.number },
    { name: 'y', type: RCTPropTypes.number },
    { name: 'imagewidth', type: RCTPropTypes.number, attr: 'width' },
    { name: 'imageheight', type: RCTPropTypes.number, attr: 'height' },
    { name: 'src', type: RCTPropTypes.string },
    { name: 'align', type: RCTPropTypes.string },
    { name: 'meetOrSlice', type: RCTPropTypes.number },
  ]),
  createManager('Line', 'line', [
    ...RENDERABLE_PROP_DEFS,
    { name: 'x1', type: RCTPropTypes.number },
    { name: 'y1', type: RCTPropTypes.number },
    { name: 'x2', type: RCTPropTypes.number },
    { name: 'y2', type: RCTPropTypes.number },
  ]),
  createManager('LinearGradient', 'linearGradient', [
    ...NODE_PROP_DEFS,
    { name: 'x1', type: RCTPropTypes.number },
    { name: 'y1', type: RCTPropTypes.number },
    { name: 'x2', type: RCTPropTypes.number },
    { name: 'y2', type: RCTPropTypes.number },
    { name: 'gradient', type: RCTPropTypes.number },
    { name: 'gradientUnits', type: RCTPropTypes.string },
    { name: 'gradientTransform', type: RCTPropTypes.string },
  ]),
  createManager('Mask', 'mask', [
    ...GROUP_PROP_DEFS,
    { name: 'x', type: RCTPropTypes.number },
    { name: 'y', type: RCTPropTypes.number },
    { name: 'maskwidth', type: RCTPropTypes.number, attr: 'width' },
    { name: 'maskheight', type: RCTPropTypes.number, attr: 'height' },
    { name: 'maskUnits', type: RCTPropTypes.string },
    { name: 'maskContentUnits', type: RCTPropTypes.string },
    { name: 'maskTransform', type: RCTPropTypes.string, attr: 'transform' },
  ]),
  createManager('Node', 'node', NODE_PROP_DEFS),
  createManager('Path', 'path', [
    ...RENDERABLE_PROP_DEFS,
    { name: 'd', type: RCTPropTypes.string },
  ]),
  createManager('Pattern', 'pattern', [
    ...GROUP_PROP_DEFS,
    { name: 'x', type: RCTPropTypes.number },
    { name: 'y', type: RCTPropTypes.number },
    { name: 'patternwidth', type: RCTPropTypes.number, attr: 'width' },
    { name: 'patternheight', type: RCTPropTypes.number, attr: 'height' },
    { name: 'patternUnits', type: RCTPropTypes.string },
    { name: 'patternContentUnits', type: RCTPropTypes.string },
    { name: 'patternTransform', type: RCTPropTypes.string },
    { name: 'minX', type: RCTPropTypes.number },
    { name: 'minY', type: RCTPropTypes.number },
    { name: 'vbWidth', type: RCTPropTypes.number },
    { name: 'vbHeight', type: RCTPropTypes.number },
    { name: 'align', type: RCTPropTypes.string },
    { name: 'meetOrSlice', type: RCTPropTypes.string },
  ]),
  createManager('RadialGradient', 'radialGradient', [
    ...NODE_PROP_DEFS,
    { name: 'fx', type: RCTPropTypes.number },
    { name: 'fy', type: RCTPropTypes.number },
    { name: 'cx', type: RCTPropTypes.number },
    { name: 'cy', type: RCTPropTypes.number },
    { name: 'rx', type: RCTPropTypes.number },
    { name: 'ry', type: RCTPropTypes.number },
    { name: 'gradient', type: RCTPropTypes.number },
    { name: 'gradientUnits', type: RCTPropTypes.string },
    { name: 'gradientTransform', type: RCTPropTypes.string },
  ]),
  createManager('Rect', 'rect', [
    ...RENDERABLE_PROP_DEFS,
    { name: 'x', type: RCTPropTypes.number },
    { name: 'y', type: RCTPropTypes.number },
    { name: 'rectwidth', type: RCTPropTypes.number },
    { name: 'rectheight', type: RCTPropTypes.number },
    { name: 'width', type: RCTPropTypes.number },
    { name: 'height', type: RCTPropTypes.number },
    { name: 'rx', type: RCTPropTypes.number },
    { name: 'ry', type: RCTPropTypes.number },
  ]),
  createManager('SvgView', 'svg', [
    { name: 'bbWidth', type: RCTPropTypes.number },
    { name: 'bbHeight', type: RCTPropTypes.number },
    { name: 'minX', type: RCTPropTypes.number },
    { name: 'minY', type: RCTPropTypes.number },
    { name: 'vbWidth', type: RCTPropTypes.number },
    { name: 'vbHeight', type: RCTPropTypes.number },
    { name: 'align', type: RCTPropTypes.string },
    { name: 'meetOrSlice', type: RCTPropTypes.string },
    { name: 'tintColor', type: RCTPropTypes.color, attr: 'color' },
  ]),
  createManager('Symbol', 'symbol', [
    ...NODE_PROP_DEFS,
    { name: 'minX', type: RCTPropTypes.number },
    { name: 'minY', type: RCTPropTypes.number },
    { name: 'vbWidth', type: RCTPropTypes.number },
    { name: 'vbHeight', type: RCTPropTypes.number },
    { name: 'align', type: RCTPropTypes.string },
    { name: 'meetOrSlice', type: RCTPropTypes.string },
  ]),
  createManager('TSpan', 'tspan', [
    ...TEXT_PROP_DEFS,
    { name: 'content', type: RCTPropTypes.string },
  ]),
  createManager('Text', 'text', [
    ...TEXT_PROP_DEFS,
    { name: 'href', type: RCTPropTypes.string },
    { name: 'side', type: RCTPropTypes.string },
    { name: 'method', type: RCTPropTypes.string },
    { name: 'midLine', type: RCTPropTypes.string }, // what is this?
    { name: 'spacing', type: RCTPropTypes.string },
    { name: 'startOffset', type: RCTPropTypes.number },
  ]),
  createManager('Use', 'use', [
    ...RENDERABLE_PROP_DEFS,
    { name: 'href', type: RCTPropTypes.string },
    { name: 'x', type: RCTPropTypes.number },
    { name: 'y', type: RCTPropTypes.number },
    { name: 'usewidth', type: RCTPropTypes.number, attr: 'width' },
    { name: 'useheight', type: RCTPropTypes.number, attr: 'height' },
  ]),
];
