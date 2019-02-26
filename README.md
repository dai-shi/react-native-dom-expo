# react-native-dom-expo
A patch library to make Expo work with react-native-dom

## Motivation
It's exciting to see [react-native-dom](https://github.com/vincentriemer/react-native-dom). What if we can use it with Expo with simplest possible steps.

This is a newly born project driven by community
to fill missing pieces to make Expo with with react-native-dom.
If you are interested in contributing, please jump in.

## How to run
```bash
expo init -t blank --name expo-rndom expo-rndom
cd expo-rndom
npm install react@16.6.3 react-native@0.57.8
npm install react-native-dom react-native-dom-expo
mkdir dom
curl https://raw.githubusercontent.com/dai-shi/typescript-expo-apollo-boilerplate/55e5c2c8716ca6dc16c035db9f3657cc2adb191a/dom/bootstrap.js > dom/bootstrap.js
curl https://raw.githubusercontent.com/dai-shi/typescript-expo-apollo-boilerplate/55e5c2c8716ca6dc16c035db9f3657cc2adb191a/dom/entry.js > dom/entry.js
curl https://raw.githubusercontent.com/dai-shi/typescript-expo-apollo-boilerplate/55e5c2c8716ca6dc16c035db9f3657cc2adb191a/dom/index.html > dom/index.html
curl https://raw.githubusercontent.com/dai-shi/typescript-expo-apollo-boilerplate/55e5c2c8716ca6dc16c035db9f3657cc2adb191a/index.js > index.js
node node_modules/react-native/local-cli/cli.js start --config ../../../react-native-dom-expo/metro.config.js
```

Then, open <http://localhost:8081/dom/> in your browser.
