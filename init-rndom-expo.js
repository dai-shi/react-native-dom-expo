#!/usr/bin/env node

const fs = require('fs');
const editJsonFile = require('edit-json-file');

if (!fs.existsSync('dom')) {
  fs.symlinkSync('node_modules/react-native-dom-expo/dom', 'dom');
}

const file = editJsonFile('./package.json');
file.set('scripts.rndom', 'node node_modules/react-native/local-cli/cli.js start --config ../../../react-native-dom-expo/metro.config.js');
file.save();
