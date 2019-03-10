const path = require('path');
const glob = require('glob');

const metroResolve = require('metro-resolver/src/resolve');

const domModuleMap = {
  // delegate to "web"
  './effects/BlurView': path.resolve(__dirname, './src/BlurView.dom.js'),
  './NativeLinearGradient': path.resolve(__dirname, './src/NativeLinearGradient.dom.js'),
  './facebook-ads': path.resolve(__dirname, './src/facebook-ads.dom.js'),

  // custom patches
  './NativeModulesProxy': path.resolve(__dirname, './src/NativeModulesProxy.dom.js'),
  './NativeViewManagerAdapter': path.resolve(__dirname, './src/NativeViewManagerAdapter.dom.js'),
  'expo-asset/src/Asset': path.resolve(__dirname, './src/ExpoAsset.dom.js'),
  'expo-asset': path.resolve(__dirname, './src/ExpoAssetIndex.dom.js'),

  // vendor libs
  'expo-camera': path.resolve(__dirname, './vendor/expo-camera/index.ts'),
  'react-native-gesture-handler': path.resolve(__dirname, './vendor/react-native-gesture-handler/index.js'),
};

// path mapping workaround for Expo SDK
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
// require('fs').appendFileSync('/tmp/metro-resolve.log', `${JSON.stringify(domModuleMap)}\n`);

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
