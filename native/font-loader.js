/* eslint-env browser */
/* eslint-disable class-methods-use-this, prefer-promise-reject-errors */

// ref: https://gist.github.com/vincentriemer/b8e5e97a92a44638a118016801d378cd

import { RCTModule } from 'react-native-dom';
import FontFaceObserver from 'fontfaceobserver';

export default class FontLoader extends RCTModule {
  static moduleName = 'ExponentFontLoader';

  $$loadAsync(nativeFontName, resource) {
    const fontName = nativeFontName.replace(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}-/, '');
    return new Promise((resolve, reject) => {
      if (!document.head) {
        reject('No document head');
        return;
      }

      const fontStyles = `@font-face {
        font-family: "${fontName}";
        src: url("${resource}");
      }`;

      const style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = fontStyles;
      } else {
        style.appendChild(document.createTextNode(fontStyles));
      }
      document.head.appendChild(style);

      const font = new FontFaceObserver(fontName);
      font.load().then(resolve).catch((e) => {
        reject(`Failed to load font "${fontName}": ${e}`);
      });
    });
  }
}
