import { NativeModules } from 'react-native';

const {
  ExponentConstants,
  ExponentFileSystem,
  ExponentCameraManager,
  ExponentFontLoader,
  ExponentPermissions,
} = NativeModules;

export default {
  ExponentConstants,
  ExponentFileSystem,
  ExponentCameraManager,
  ExpoFontLoader: ExponentFontLoader,
  ExpoPermissions: ExponentPermissions,
};
