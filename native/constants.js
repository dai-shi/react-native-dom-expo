import uuidv4 from 'uuid/v4';
import UAParser from 'ua-parser-js';
import ExpoPackageJson from 'expo/package.json';
import { RCTModule } from 'react-native-dom';

import appJson from '../../../app.json';

export default class Constants extends RCTModule {
  static moduleName = 'ExponentConstants';

  sessionId = uuidv4();

  constantsToExport() {
    return {
      appOwnership: 'expo',
      deviceId: null,
      sessionId: this.sessionId,
      platform: { dom: UAParser(navigator.userAgent) },
      isDevice: true,
      expoVersion: ExpoPackageJson.version,
      linkingUri: window.location.origin + window.location.pathname,
      expoRuntimeVersion: null,
      deviceName: null,
      systemFonts: [],
      statusBarHeight: 0,
      deviceYearClass: null,
      manifest: {
        ...appJson.expo,
        ...(__DEV__ && {
          developer: {},
          bundleUrl: window.location.origin + window.location.pathname,
        }),
      },
    };
  }

  $getWebViewUserAgentAsync() {
    return navigator.userAgent;
  }
}
