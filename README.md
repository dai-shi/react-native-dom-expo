# react-native-dom-expo
A patch library to make Expo work with react-native-dom

## Motivation
It's exciting to see [react-native-dom](https://github.com/vincentriemer/react-native-dom). What if we can use it with Expo with the simplest possible steps.

This is a newly born project driven by the community
to fill in the missing pieces to make Expo work with react-native-dom.
If you are interested in contributing, please jump in.

## How to run
```bash
npx expo-cli init -t blank --name expo-rndom --non-interactive expo-rndom
cd expo-rndom
npm install react@16.6.3 react-native@0.57.8
npm install react-native-dom react-native-dom-expo
npx init-rndom-expo
npm run rndom
```

Then, open <http://localhost:8081/dom/> in your browser.
