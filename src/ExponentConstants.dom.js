import ExponentConstants from '../../expo-constants/build/ExponentConstants.web';

import appJson from '../../../app.json';

export default {
  ...ExponentConstants,
  platform: {
    dom: ExponentConstants.platform.web,
  },
  manifest: {
    ...appJson.expo,
    ...(__DEV__ && {
      developer: {},
      bundleUrl: 'http://localhost:8081/dom/',
    }),
  },
};
