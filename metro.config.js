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

const dirRNLib = path.resolve(__dirname, '../react-native/Libraries') + '/';
const dirRNDOMLib = path.resolve(__dirname, '../react-native-dom/Libraries') + '/';

const getFullModulePath = (context, realModuleName) => {
  if (context.originModulePath && realModuleName.startsWith('.')) {
    return path.resolve(context.originModulePath, '..', realModuleName);
  }
  return realModuleName;
};

module.exports = {
  projectRoot: path.resolve(__dirname, '../..'),
  resolver: {
    resolveRequest: (context, realModuleName, platform) => {
      const fullPath = getFullModulePath(context, realModuleName);
      if (platform === 'dom') {
        if (domModuleMap[realModuleName]) {
          realModuleName = domModuleMap[realModuleName];
        } else if (fullPath.startsWith(dirRNLib)) {
          // path mapping workaround for Expo SDK
          const pathRNDOM = path.resolve(dirRNDOMLib, fullPath.slice(dirRNLib.length));
          if (glob.sync(pathRNDOM + '.dom.*').length > 0) {
            realModuleName = pathRNDOM;
          }
        }
      }
      // require('fs').appendFileSync('/tmp/metro-resolve.log', `${realModuleName}\n`);
      const { resolveRequest, ...restContext } = context;
      return metroResolve(restContext, realModuleName, platform);
    },
  },
};
