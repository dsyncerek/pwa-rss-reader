/* eslint-disable no-restricted-globals */

import { onActivate } from './onActivate';
import { onFetch } from './onFetch';
import { onInstall } from './onInstall';
import { onSync, replayRequests } from './onSync';

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
self.addEventListener('sync', onSync);

if (!('sync' in self.registration)) {
  // If the browser doesn't support background sync, retry
  // every time the service worker starts up as a fallback.
  replayRequests().catch();
}
