import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Constants = {
  statusBarHeight: 0,
};

export const Asset = {
  loadAsync() {
    // TODO
    return Promise.resolve();
  },
};

export const Font = {
  loadAsync() {
    // TODO
    return Promise.resolve();
  },
};

export class AppLoading extends React.Component {
  componentDidMount() {
    if (this.props.startAsync) {
      (async () => {
        try {
          await this.props.startAsync();
          if (this.props.onFinish) {
            this.props.onFinish();
          }
        } catch (e) {
          if (this.props.onError) {
            this.props.onError(e);
          }
        }
      })();
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4E5EAB',
        }}
      >
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }
}
