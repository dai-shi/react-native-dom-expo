/* eslint-env browser */

import { RNDomInstance } from 'react-native-dom';
import FontLoader from 'react-native-dom-expo/native/font-loader';
import WebBrowser from 'react-native-dom-expo/native/web-browser';
import SplashScreen from 'react-native-dom-expo/native/splash-screen';
import FileSystem from 'react-native-dom-expo/native/file-system';

import appJson from '../app.json';

// Show splash screen =========================================
if (appJson.expo.splash) {
  const splash = document.getElementById('rndom-expo-splash-screen');
  let imgSrc = appJson.expo.splash.image;
  if (imgSrc) {
    if (imgSrc.startsWith('./')) imgSrc = '.' + imgSrc;
    splash.style.backgroundImage = 'url("' + imgSrc + '")';
  }
  if (appJson.expo.splash.backgroundColor) {
    splash.style.backgroundColor = appJson.expo.splash.backgroundColor;
  }
  if (appJson.expo.splash.resizeMode) {
    splash.style.backgroundSize = appJson.expo.splash.resizeMode;
  }
  window.expoSplashTimer = setTimeout(() => {
    splash.style.display = 'none';
  }, 5000);
}

// Path to RN Bundle Entrypoint ===============================
const rnBundlePath = './entry.bundle?platform=dom&dev=true';

// React Native DOM Runtime Options ===========================
const ReactNativeDomOptions = {
  enableHotReload: false,
  nativeModules: [
    FontLoader,
    WebBrowser,
    SplashScreen,
    FileSystem,
  ],
};

// App Initialization =========================================
const app = new RNDomInstance(
  rnBundlePath,
  appJson.expo.name,
  document.body,
  ReactNativeDomOptions,
);

app.start();
