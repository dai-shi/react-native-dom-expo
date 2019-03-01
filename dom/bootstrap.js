/* eslint-env browser */

import { RNDomInstance } from 'react-native-dom';
import FontLoader from 'react-native-dom-expo/native/font-loader';

import appJson from '../app.json';

// Path to RN Bundle Entrypoint ===============================
const rnBundlePath = './entry.bundle?platform=dom&dev=true';

// React Native DOM Runtime Options ===========================
const ReactNativeDomOptions = {
  enableHotReload: false,
  nativeModules: [FontLoader],
};

// App Initialization =========================================
const app = new RNDomInstance(
  rnBundlePath,
  appJson.expo.name,
  document.body,
  ReactNativeDomOptions,
);

app.start();
