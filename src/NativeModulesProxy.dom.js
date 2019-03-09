import { NativeModules } from 'react-native';

const {
  ExponentConstants,
  ExponentFontLoader,
  ExponentFileSystem,
} = NativeModules;

export default {
  ExponentConstants,
  ExpoFontLoader: ExponentFontLoader,
  ExponentFileSystem,
};
