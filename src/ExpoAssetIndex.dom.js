/* eslint-disable global-require */

module.exports = {
  get Asset() {
    return require('./ExpoAsset.dom').default;
  },
};
