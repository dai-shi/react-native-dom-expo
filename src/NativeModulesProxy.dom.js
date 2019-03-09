import { NativeModules } from 'react-native';

const {
  ExponentConstants,
  ExponentFileSystem,
  ExponentFontLoader,
  ExponentPermissions,
} = NativeModules;

export default {
  ExponentConstants,
  ExponentFileSystem,
  ExpoFontLoader: ExponentFontLoader,
  ExpoPermissions: ExponentPermissions,
};
