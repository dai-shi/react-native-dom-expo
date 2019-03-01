/* eslint-env browser */
/* eslint-disable class-methods-use-this */

// ref: https://gist.github.com/vincentriemer/b8e5e97a92a44638a118016801d378cd

import RCTModule from 'react-native-dom/lib/bridge/RCTModule';
import FontFaceObserver from 'fontfaceobserver';

export default class FontLoader extends RCTModule {
  static moduleName = 'FontLoader';

  async $$loadFont(name, url) {
    if (!document.head) return Promise.reject();

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
    return font.load();
  }
}
