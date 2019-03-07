/* eslint-env browser */
/* eslint-disable class-methods-use-this */

import { RCTModule } from 'react-native-dom';

export default class SplashScreen extends RCTModule {
  static moduleName = 'ExponentSplashScreen';

  $preventAutoHide() {
    clearTimeout(window.expoSplashTimer);
  }

  $hide() {
    const splash = document.getElementById('rndom-expo-splash-screen');
    if (splash) {
      splash.style.display = 'none';
    }
  }
}
