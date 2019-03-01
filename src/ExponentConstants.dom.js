import ExponentConstants from '../../expo-constants/build/ExponentConstants.web';

export default {
  ...ExponentConstants,
  platform: {
    dom: ExponentConstants.platform.web,
  },
  manifest: {
    ...(__DEV__ && {
      developer: {},
      bundleUrl: 'http://localhost:8081/dom/',
    }),
  },
};
