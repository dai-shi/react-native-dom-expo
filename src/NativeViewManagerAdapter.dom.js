/* eslint-disable import/prefer-default-export */

import { requireNativeComponent } from 'react-native';

export const requireNativeViewManager = viewName => requireNativeComponent(viewName);
