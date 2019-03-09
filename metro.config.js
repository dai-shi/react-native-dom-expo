const path = require('path');
const glob = require('glob');

const metroResolve = require('metro-resolver/src/resolve');

const domModuleMap = {
  './effects/BlurView': path.resolve(__dirname, './src/BlurView.dom.js'),
  './NativeLinearGradient': path.resolve(__dirname, './src/NativeLinearGradient.dom.js'),
  './NativeModulesProxy': path.resolve(__dirname, './src/NativeModulesProxy.dom.js'),
  './ExponentNotifications': path.resolve(__dirname, './src/ExponentNotifications.dom.js'),
  './ExponentSecureStore': path.resolve(__dirname, './src/ExponentSecureStore.dom.js'),
  './ExponentSpeech': path.resolve(__dirname, './src/ExponentSpeech.dom.js'),
  'expo-constants': path.resolve(__dirname, './src/ExponentConstants.dom.js'),
  'expo-asset/src/Asset': path.resolve(__dirname, './src/ExpoAsset.dom.js'),
  'expo-asset': path.resolve(__dirname, './src/ExpoAssetIndex.dom.js'),
  './facebook-ads': path.resolve(__dirname, './src/facebook-ads.dom.js'),

  'react-native-gesture-handler': path.resolve(__dirname, './vendor/react-native-gesture-handler/index.js'),
};

// pass mapping workaround for Expo SDK
const baseDir = path.resolve(__dirname, '../react-native-dom/Libraries');
glob.sync(baseDir + '/**/*.dom.js').forEach((fullPath) => {
  const relPath = fullPath.slice(baseDir.length, -'.dom.js'.length);
  const pathList = relPath.split('/');
  const name = pathList.pop();
  const dir = pathList.pop();
  domModuleMap['./..' + relPath] = fullPath;
  domModuleMap['./../..' + relPath] = fullPath;
  domModuleMap['./' + name] = fullPath;
  domModuleMap['./../../' + dir + '/' + name] = fullPath;
});
require('fs').appendFileSync('/tmp/metro-resolve.log', `${JSON.stringify(domModuleMap, null, 2)}\n`);

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
