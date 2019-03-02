import Constants from 'expo-constants';

import { NativeModules } from 'react-native';

const { FontLoader } = NativeModules;

export default {
  get name() {
    return 'ExpoFontLoader';
  },
  loadAsync(nativeFontName, resource) {
    // To revert `${Constants.sessionId}-${name}`
    const fontName = nativeFontName.slice(Constants.sessionId.length + 1);
    return new Promise((resolve, reject) => {
      FontLoader.loadFont(fontName, resource, resolve, reject);
    });
  },
};
