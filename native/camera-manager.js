import { RCTView, RCTViewManager } from 'react-native-dom';

import ExponentCameraManager from '../vendor/expo-camera/ExponentCameraManager.web';
import CameraModule from '../vendor/expo-camera/CameraModule/CameraModule';

class Camera extends RCTView {
  constructor(bridge) {
    super(bridge);

    const videoElement = document.createElement('video');
    this.camera = new CameraModule(videoElement);
    this.childContainer.appendChild(videoElement);
  }

  set type(value) {
    this.camera.setTypeAsync(value);
  }

  // TODO setters, methods
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
      .addStringProp('type', this.setType);
  }

  setType(view, value) {
    view.type = value;
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

  $$takePicture(options, camera) {
    return ExponentCameraManager.takePicture(options, camera);
  }

  // $$getSupportedRatios(camera) {}

  $$getAvailablePictureSizes(ratio, camera) {
    return ExponentCameraManager.getAvailablePictureSizes(ratio, camera);
  }

  $pausePreview(camera) {
    ExponentCameraManager.pausePreview(camera);
  }

  // $$recordAsync(options, camera) {}

  // $stopRecording(camera) {}

  $resumePreview(camera) {
    ExponentCameraManager.resumePreview(camera);
  }
}
