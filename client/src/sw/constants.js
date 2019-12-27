/* eslint-disable no-restricted-globals */

import { files } from '../../build/asset-manifest';
import { prepareFullUrl } from './utils/prepareFullUrl';

export const APP_ENTRYPOINT = prepareFullUrl('/index.html');
export const REQUESTS_DB_NAME = 'request-store';
export const REQUESTS_TABLE = 'requests';
export const REQUESTS_SYNC_EVENT_TAG = 'sync-requests';
export const REQUESTS_SYNC_HEADER = 'X-BG-SYNC';

export const API_URL_REGEX = /\/api\//;
export const FILE_URL_REGEX = /[^/?]+\.[^/]+$/;

export const CACHES = {
  STATIC: 'static-cache-v1',
  RUNTIME: 'runtime-cache-v1',
};

export const STATIC_ASSETS = Object.values(files).map(prepareFullUrl)
  .filter(asset => !asset.includes('.map') && !asset.includes('service-worker.js'));

