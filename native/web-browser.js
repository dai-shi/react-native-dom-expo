/* eslint-env browser */

import { RCTModule } from 'react-native-dom';

export default class WebBrowser extends RCTModule {
  static moduleName = 'WebBrowser';

  $openBrowserAsync(url, resolveId, rejectId) {
    const resolve = this.bridge.callbackFromId(resolveId);
    const reject = this.bridge.callbackFromId(rejectId);
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
      reject(`Failed to open browser: ${e}`);
    }
  }

  $dismissBrowser(resolveId, rejectId) {
    const resolve = this.bridge.callbackFromId(resolveId);
    const reject = this.bridge.callbackFromId(rejectId);
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
      reject(`Failed to dismiss browser: ${e}`);
    }
  }
}
