/* eslint-env browser */

import { RNDomInstance } from 'react-native-dom';

import Constants from 'react-native-dom-expo/native/constants';
import FontLoader from 'react-native-dom-expo/native/font-loader';
import WebBrowser from 'react-native-dom-expo/native/web-browser';
import SplashScreen from 'react-native-dom-expo/native/splash-screen';
import FileSystem from 'react-native-dom-expo/native/file-system';
import Notifications from 'react-native-dom-expo/native/notifications';
import SecureStore from 'react-native-dom-expo/native/secure-store';
import Speech from 'react-native-dom-expo/native/speech';
import Permissions from 'react-native-dom-expo/native/permissions';
import CameraManager from 'react-native-dom-expo/native/camera-manager';
import Svg from 'react-native-dom-expo/native/svg';

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
    Constants,
    FontLoader,
    WebBrowser,
    SplashScreen,
    FileSystem,
    Notifications,
    SecureStore,
    Speech,
    Permissions,
    CameraManager,
    ...Svg,
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
