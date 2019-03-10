/* eslint-disable import/prefer-default-export */

import React from 'react';
import { requireNativeComponent } from 'react-native';

const createExponentCamera = () => {
  const Camera = class Camera extends React.Component {
    render() {
      return (
        <React.Fragment>
          <ExponentCamera />
        </React.Fragment>
      );
    }
  };
  const ExponentCamera = requireNativeComponent('ExponentCamera', Camera);
  return Camera;
};

export const requireNativeViewManager = (viewName) => {
  switch (viewName) {
    case 'ExponentCamera':
      return createExponentCamera();
    default:
      throw new Error('requireNativeViewManager not implemented for ' + viewName);
  }
};
