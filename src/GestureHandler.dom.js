import React from 'react';
import {
  ScrollView,
  Slider,
  Switch,
  TextInput,
  ToolbarAndroid,
  ViewPagerAndroid,
  DrawerLayoutAndroid,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

const gestureHandlerRootHOC = Component => Component;
const Swipeable = 'TODO';
const DrawerLayout = 'TODO';

const Directions = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
};

const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

// Factory for stub Handler components
function createStubHandler(name) {
  return class NativeViewGestureHandler extends React.Component {
    static displayName = name;

    // eslint-disable-next-line class-methods-use-this
    setNativeProps() {
      // Since this is a stub we do not need to pass on native props.
      // However, we need to implement it here to avoid null calls.
    }

    render() {
      const { children, ...rest } = this.props;

      // We don't want to create another layer, so instead we just clone it
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        ...rest,
      });
    }
  };
}

// Create all Handler components with their respective handler functions
// (at the moment only TapGestureHandler is properly supported)
const NativeViewGestureHandler = createStubHandler('NativeViewGestureHandler');

class TapGestureHandler extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  setNativeProps() {}

  handlePress = ({
    nativeEvent: {
      locationX, locationY, pageX, pageY,
    },
  }) => {
    const { enabled, onHandlerStateChange } = this.props;

    if (enabled !== false && onHandlerStateChange) {
      onHandlerStateChange({
        nativeEvent: {
          oldState: State.ACTIVE,
          state: State.UNDETERMINED,
          x: locationX,
          y: locationY,
          absoluteX: pageX,
          absoluteY: pageY,
        },
      });
    }
  };

  render() {
    const { children, maxDurationMs, style } = this.props;

    return (
      <TouchableWithoutFeedback
        style={style}
        onPress={this.handlePress}
        delayLongPress={maxDurationMs}
      >
        {children}
      </TouchableWithoutFeedback>
    );
  }
}

const FlingGestureHandler = createStubHandler('FlingGestureHandler');

const ForceTouchGestureHandler = createStubHandler('ForceTouchGestureHandler');

const LongPressGestureHandler = createStubHandler('LongPressGestureHandler');

const PanGestureHandler = createStubHandler('PanGestureHandler');

const PinchGestureHandler = createStubHandler('PinchGestureHandler');

const RotationGestureHandler = createStubHandler('RotationGestureHandler');

// Factory for stub Button component
// (at the moment this is a plain TouchableWithoutFeedback)
function createStubButton(name) {
  return class Button extends React.Component {
    static displayName = name;

    render() {
      return (
        <TouchableWithoutFeedback accessibilityRole="button" {...this.props} />
      );
    }
  };
}

const RawButton = createStubButton('RawButton');
const BaseButton = createStubButton('BaseButton');
const RectButton = createStubButton('RectButton');
const BorderlessButton = createStubButton('BorderlessButton');

// Export same components as in GestureHandler.js
export {
  ScrollView,
  Slider,
  Switch,
  TextInput,
  ToolbarAndroid,
  ViewPagerAndroid,
  DrawerLayoutAndroid,
  NativeViewGestureHandler,
  TapGestureHandler,
  FlingGestureHandler,
  ForceTouchGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
  /* Buttons */
  RawButton,
  BaseButton,
  RectButton,
  BorderlessButton,
  /* Other */
  FlatList,
  gestureHandlerRootHOC,
  Directions,
  //
  Swipeable,
  DrawerLayout,
};
