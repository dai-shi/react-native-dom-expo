import { RCTModule } from 'react-native-dom';

import ExpoPermissions from '../../expo-permissions/src/ExpoPermissions.web';

export default class Permissions extends RCTModule {
  static moduleName = 'ExpoPermissions';

  $$getAsync(...types) {
    return ExpoPermissions.getAsync(...types);
  }

  $$askAsync(...types) {
    return ExpoPermissions.askAsync(...types);
  }
}
