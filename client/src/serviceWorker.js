/* eslint-disable no-restricted-globals */

import { files } from '../build/asset-manifest.json';

const STATIC_CACHE_NAME = 'static-cache';
const RUNTIME_CACHE_NAME = 'runtime-cache';

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
self.addEventListener('message', event => {});
self.addEventListener('sync', event => {});
self.addEventListener('push', event => {});

async function onInstall(event) {
  console.log('onInstall');

  const projectFiles = Object.values(files)
    .filter(file => !file.endsWith('.map') && !file.includes('service-worker.js'));

  const cache = await caches.open(STATIC_CACHE_NAME);
  const alreadyCachedFiles = (await cache.keys()).map(request => request.url);
  const filesToCache = projectFiles.filter(file => !alreadyCachedFiles.includes(file));

  await cache.addAll(filesToCache);
}

function onActivate(event) {
  console.log('onActivate');
}

async function onFetch(event) {
  console.log('onFetch', event.request.url);

  if (event.request.mode === 'navigate') {
    event.respondWith(cacheFirst('/index.html'));
    return;
  }

  if (event.request.method === 'GET') {
    event.respondWith(cacheFirst(event.request));
  } else {
    event.respondWith(networkOnly(event.request));
  }
}

async function cacheFirst(request) {
  try {
    return await fromCache(request);
  } catch {
    return await fromNetwork(request);
  }
}

async function networkFirst(request) {
  try {
    return await fromNetwork(request);
  } catch (error) {
    try {
      return await fromCache(request);
    } catch {
      throw error;
    }
  }
}

async function networkOnly(request) {
  return fromNetwork(request);
}

async function fromCache(request) {
  console.log(' fromCache', request.url || request);

  const cache = await caches.open(STATIC_CACHE_NAME);
  const response = await cache.match(request);

  if (!response) {
    throw new Error('Request is not in cache.');
  }

  return response;
}

async function fromNetwork(request) {
  console.log(' fromNetwork', request.url || request);

  return await fetch(request);
}
