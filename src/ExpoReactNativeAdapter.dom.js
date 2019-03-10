import {
  Platform as ReactNativePlatform,
  NativeModules,
  requireNativeComponent,
} from 'react-native';

import { EventEmitter, Subscription } from '../expo-react-native-adapter/build/EventEmitter';

export const Platform = {
  OS: ReactNativePlatform.OS,
};

const NativeModulesProxy = {};
Object.keys(NativeModules).forEach((moduleName) => {
  if (moduleName.startsWith('Expo')) {
    NativeModulesProxy[moduleName] = NativeModules[moduleName];
  }
});

const requireNativeViewManager = viewName => requireNativeComponent(viewName);

export {
  EventEmitter,
  Subscription,
  NativeModulesProxy,
  requireNativeViewManager,
};
