/* eslint-env browser */

// ref: https://gist.github.com/vincentriemer/b8e5e97a92a44638a118016801d378cd

import { RCTModule } from 'react-native-dom';
import FontFaceObserver from 'fontfaceobserver';

export default class FontLoader extends RCTModule {
  static moduleName = 'FontLoader';

  $loadFont(name, url, resolveId, rejectId) {
    const resolve = this.bridge.callbackFromId(resolveId);
    const reject = this.bridge.callbackFromId(rejectId);
    if (!document.head) {
      reject('No document head');
      return;
    }

    const fontStyles = `@font-face {
      font-family: "${name}";
      src: url("${url}");
    }`;

    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = fontStyles;
    } else {
      style.appendChild(document.createTextNode(fontStyles));
    }
    document.head.appendChild(style);

    const font = new FontFaceObserver(name);
    font.load().then(resolve).catch((e) => {
      reject(`Failed to load font "${name}": ${e}`);
    });
  }
}
