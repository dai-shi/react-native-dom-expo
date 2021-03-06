import { RCTView, RCTViewManager, RCTEvent } from 'react-native-dom';
import { normalizeInputEventName } from 'react-native-dom/lib/bridge/RCTEventDispatcher';

import ExponentCameraManager from '../vendor/expo-camera/ExponentCameraManager.web';
import CameraModule from '../vendor/expo-camera/CameraModule/CameraModule';

class CameraEvent implements RCTEvent {
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
}

const videoElementStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

class Camera extends RCTView {
  constructor(bridge) {
    super(bridge);
    Object.assign(this.style, { overflow: 'hidden' });
    this.createVideoElement();
    this.initializeCameraModule(this.videoElement);
    this.childContainer.appendChild(this.videoElement);
  }

  createVideoElement() {
    this.videoElement = document.createElement('video');
    Object.assign(this.videoElement.style, videoElementStyle);
    this.videoElement.autoplay = true;
    this.videoElement.playsInline = true;
  }

  initializeCameraModule(videoElement) {
    this.camera = new CameraModule(videoElement);
    this.camera.onCameraReady = () => {
      this.setVideoElementTransform();
      this.sendEvent('onCameraReady');
    };
    this.camera.onMountError = (e) => {
      this.sendEvent('MountError', e);
    };
  }

  setVideoElementTransform() {
    const actualCameraType = this.camera.getActualCameraType();
    const transform = actualCameraType === ExponentCameraManager.Type.front ? 'rotateY(180deg)' : 'none';
    Object.assign(this.videoElement.style, { transform });
  }

  sendEvent(name, payload) {
    this.bridge.eventDispatcher.sendEvent(new CameraEvent(name, this.reactTag, payload));
  }
}

customElements.define('expo-camera', Camera);

export default class CameraManager extends RCTViewManager {
  static moduleName = 'ExponentCameraManager';

  view() {
    return new Camera(this.bridge);
  }

  describeProps() {
    return super
      .describeProps()
      .addStringProp('type', this.setType)
      .addStringProp('flashMode', this.setFlashMode)
      .addStringProp('autoFocus', this.setAutoFocus)
      .addNumberProp('zoom', this.setZoom)
      .addStringProp('whiteBalance', this.setWhiteBalance)
      .addStringProp('pictureSize', this.setPictureSize)
      .addDirectEvent('onCameraReady')
      .addDirectEvent('onMountError');
  }

  setType(view, value) {
    view.camera.setTypeAsync(value);
  }

  setFlashMode(view, value) {
    view.camera.setFlashModeAsync(value);
  }

  setAutoFocus(view, value) {
    view.camera.setAutoFocusAsync(value);
  }

  setZoom(view, value) {
    view.camera.setZoomAsync(value);
  }

  setWhiteBalance(view, value) {
    view.camera.setWhiteBalanceAsync(value);
  }

  setPictureSize(view, value) {
    view.camera.setPictureSize(value);
  }

  constantsToExport() {
    return {
      Type: ExponentCameraManager.Type,
      FlashMode: ExponentCameraManager.FlashMode,
      AutoFocus: ExponentCameraManager.AutoFocus,
      WhiteBalance: ExponentCameraManager.WhiteBalance,
      VideoQuality: ExponentCameraManager.VideoQuality,
    };
  }

  $$takePicture(options, reactTag) {
    return new Promise((resolve, reject) => {
      this.bridge.uiManager.addUIBlock((_, viewRegistry) => {
        const view = viewRegistry.get(reactTag);
        if (view && view instanceof Camera) {
          const capturedPicture = view.camera.takePicture(options);
          resolve(capturedPicture);
        } else {
          reject(new Error('no camera view'));
        }
      });
    });
  }

  // $$recordAsync(options, camera) {}

  // $stopRecording(camera) {}

  // $$getSupportedRatios(camera) {}

  $$getAvailablePictureSizes(ratio, reactTag) {
    return new Promise((resolve, reject) => {
      this.bridge.uiManager.addUIBlock((_, viewRegistry) => {
        const view = viewRegistry.get(reactTag);
        if (view && view instanceof Camera) {
          view.camera.getAvailablePictureSizes(ratio).then(resolve).catch(reject);
        } else {
          reject(new Error('no camera view'));
        }
      });
    });
  }

  $pausePreview(reactTag) {
    this.bridge.uiManager.addUIBlock((_, viewRegistry) => {
      const view = viewRegistry.get(reactTag);
      if (view && view instanceof Camera) {
        view.camera.pausePreview();
      }
    });
  }

  $resumePreview(reactTag) {
    this.bridge.uiManager.addUIBlock((_, viewRegistry) => {
      const view = viewRegistry.get(reactTag);
      if (view && view instanceof Camera) {
        view.camera.resumePreview();
      }
    });
  }
}
