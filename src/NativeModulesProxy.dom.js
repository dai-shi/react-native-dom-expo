import { NativeModules } from 'react-native';

const {
  ExponentFontLoader,
  ExponentFileSystem,
} = NativeModules;

export default {
  ExpoFontLoader: ExponentFontLoader,
  ExponentFileSystem,
};
