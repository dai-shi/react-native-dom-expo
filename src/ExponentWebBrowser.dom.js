import { NativeModules } from 'react-native';

const { WebBrowser } = NativeModules;

export default {
  get name() {
    return 'ExponentWebBrowser';
  },
  openBrowserAsync(url) {
    return new Promise((resolve, reject) => {
      WebBrowser.openBrowserAsync(url, resolve, reject);
    });
  },
  dismissBrowser() {
    return new Promise((resolve, reject) => {
      WebBrowser.dismissBrowser(resolve, reject);
    });
  },
};
