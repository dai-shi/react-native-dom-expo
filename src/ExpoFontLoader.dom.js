export default {
  get name() {
    return 'ExpoFontLoader';
  },
  loadAsync(fontFamilyName, resource) {
    console.log('font loader not impelmented', fontFamilyName, resource);
    throw new Error('font loader not implemented');
  },
};
