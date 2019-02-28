/* eslint-disable no-underscore-dangle, import/prefer-default-export */

import { EventEmitter } from 'expo-core';
import UUID from 'uuid-js';
import FS from '../../expo-file-system/src/ExponentFileSystem.web';

const normalizeEndingSlash = (p) => {
  if (p != null) {
    return `${p.replace(/\/*$/, '')}/`;
  }
  return null;
};

const EncodingTypes = {
  UTF8: 'utf8',
  Base64: 'base64',
};

class DownloadResumable {
  constructor(url, fileUri, options, callback, resumeData) {
    this._uuid = UUID.create(4).toString();
    this._url = url;
    this._fileUri = fileUri;
    this._options = options;
    this._resumeData = resumeData;
    this._callback = callback;
    this._subscription = null;
    this._emitter = new EventEmitter(FS);
  }

  async downloadAsync() {
    this._addSubscription();
    return FS.downloadResumableStartAsync(
      this._url,
      this._fileUri,
      this._uuid,
      this._options,
      this._resumeData,
    );
  }

  async pauseAsync() {
    const pauseResult = await FS.downloadResumablePauseAsync(this._uuid);
    this._removeSubscription();
    if (pauseResult) {
      this._resumeData = pauseResult.resumeData;
      return this.savable();
    }
    throw new Error('Unable to generate a savable pause state');
  }

  async resumeAsync() {
    this._addSubscription();
    return FS.downloadResumableStartAsync(
      this._url,
      this._fileUri,
      this._uuid,
      this._options,
      this._resumeData,
    );
  }

  savable() {
    return {
      url: this._url,
      fileUri: this._fileUri,
      options: this._options,
      resumeData: this._resumeData,
    };
  }

  _addSubscription(): void {
    if (this._subscription) {
      return;
    }
    this._subscription = this._emitter.addListener(
      'Exponent.downloadProgress',
      ({ uuid, data }) => {
        if (uuid === this._uuid) {
          const callback = this._callback;
          if (callback) {
            callback(data);
          }
        }
      },
    );
  }

  _removeSubscription(): void {
    if (!this._subscription) {
      return;
    }
    this._emitter.removeSubscription(this._subscription);
    this._subscription = null;
  }
}

const createDownloadResumable = (
  uri, fileUri, options, callback, resumeData,
) => new DownloadResumable(uri, fileUri, options, callback, resumeData);

const FileSystem = {
  ...FS,
  documentDirectory: normalizeEndingSlash(FS.documentDirectory),
  cacheDirectory: normalizeEndingSlash(FS.cacheDirectory),
  EncodingTypes,
  createDownloadResumable,
};

export { FileSystem };
