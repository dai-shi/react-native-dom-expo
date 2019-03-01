import Constants from 'expo-constants';

import { NativeModules } from 'react-native';

const { FontLoader } = NativeModules;

export default {
  get name() {
    return 'ExpoFontLoader';
  },
  async loadAsync(nativeFontName, resource) {
    // To revert `${Constants.sessionId}-${name}`
    const fontName = nativeFontName.slice(Constants.sessionId.length + 1);
    return FontLoader.loadFont(fontName, resource);
  },
};
