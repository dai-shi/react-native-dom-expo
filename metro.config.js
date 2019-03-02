const path = require('path');

const metroResolve = require('metro-resolver/src/resolve');

const domModuleMap = {
  './effects/BlurView': path.resolve(__dirname, './src/BlurView.dom.js'),
  './NativeLinearGradient': path.resolve(__dirname, './src/NativeLinearGradient.dom.js'),
  './ExponentNotifications': path.resolve(__dirname, './src/ExponentNotifications.dom.js'),
  './ExponentSecureStore': path.resolve(__dirname, './src/ExponentSecureStore.dom.js'),
  './ExponentSpeech': path.resolve(__dirname, './src/ExponentSpeech.dom.js'),
  './ExpoFontLoader': path.resolve(__dirname, './src/ExpoFontLoader.dom.js'),
  './ExponentWebBrowser': path.resolve(__dirname, './src/ExponentWebBrowser.dom.js'),
  'expo-constants': path.resolve(__dirname, './src/ExponentConstants.dom.js'),
  'expo-file-system': path.resolve(__dirname, './src/ExponentFileSystem.dom.js'),
  'expo-asset/src/Asset': path.resolve(__dirname, './src/ExpoAsset.dom.js'),
  'expo-asset': path.resolve(__dirname, './src/ExpoAssetIndex.dom.js'),
  './facebook-ads': path.resolve(__dirname, './src/facebook-ads.dom.js'),

  'react-native-gesture-handler': path.resolve(__dirname, './src/GestureHandler.dom.js'),
};

module.exports = {
  projectRoot: path.resolve(__dirname, '../..'),
  resolver: {
    resolveRequest: (context, realModuleName, platform) => {
      if (platform === 'dom' && domModuleMap[realModuleName]) {
        realModuleName = domModuleMap[realModuleName];
      }
      // require('fs').appendFileSync('/tmp/metro-resolve.log', `${realModuleName}\n`);
      const { resolveRequest, ...restContext } = context;
      return metroResolve(restContext, realModuleName, platform);
    },
  },
};
