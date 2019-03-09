/* eslint-env browser */
/* eslint-disable prefer-promise-reject-errors */

import { RCTModule } from 'react-native-dom';

export default class WebBrowser extends RCTModule {
  static moduleName = 'ExponentWebBrowser';

  $$openBrowserAsync(url) {
    return new Promise((resolve, reject) => {
      try {
        this.win = window.open(url);
        this.win.onunload = () => {
          if (this.win) {
            this.win = null;
            resolve({ type: 'cancel' });
          } else {
            resolve({ type: 'dismiss' });
          }
        };
      } catch (e) {
        reject(e);
      }
    });
  }

  $$dismissBrowser() {
    return new Promise((resolve, reject) => {
      try {
        if (this.win) {
          const { win } = this;
          this.win = null;
          win.close();
          resolve({ type: 'dismiss' });
        } else {
          throw new Error('already dismissed');
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}
