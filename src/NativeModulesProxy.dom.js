import { NativeModules } from 'react-native';

const nativeModulesProxy = {};
Object.keys(NativeModules).forEach((moduleName) => {
  if (moduleName.startsWith('Expo')) {
    nativeModulesProxy[moduleName] = NativeModules[moduleName];
  }
});

export default nativeModulesProxy;
