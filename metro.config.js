const path = require('path');

const metroResolve = require('metro-resolver/src/resolve');

module.exports = {
  projectRoot: path.resolve(__dirname, '../..'),
  resolver: {
    resolveRequest: (context, realModuleName, platform) => {
      if (platform === 'dom' && realModuleName === 'expo') {
        realModuleName = path.resolve(__dirname, './src/Expo.dom.js');
      }
      if (platform === 'dom' && realModuleName === 'react-native-gesture-handler') {
        realModuleName = path.resolve(__dirname, './src/GestureHandler.dom.js');
      }
      const { resolveRequest, ...restContext } = context;
      return metroResolve(restContext, realModuleName, platform);
    },
  },
};
