/* eslint-disable no-restricted-globals */

import { onActivate } from './onActivate';
import { onFetch } from './onFetch';
import { onInstall } from './onInstall';

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
