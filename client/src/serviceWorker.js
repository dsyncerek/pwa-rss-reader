/* eslint-disable no-restricted-globals */

import { files } from '../build/asset-manifest.json';

const CACHES = {
  STATIC: 'static-cache-v2',
  RUNTIME: 'runtime-cache-v1',
};

const APP_ENTRYPOINT = '/index.html';

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
self.addEventListener('message', event => {});
self.addEventListener('sync', event => {});
self.addEventListener('push', event => {});

async function onInstall() {
  console.log('onInstall');

  await addNewAssetsToCache();
}

async function onActivate() {
  console.log('onActivate');

  await removeOldCaches();
  await removeOldAssetsFromCache();
}

async function onFetch(event) {
  console.log('onFetch', event.request.url);

  if (event.request.mode === 'navigate' && !event.request.url.includes('/api/')) {
    event.respondWith(cacheFirst(APP_ENTRYPOINT));
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
  const cache = await caches.open(CACHES.STATIC);
  const response = await cache.match(request);

  if (!response) {
    throw new Error('Request is not in cache.');
  }

  return response;
}

async function fromNetwork(request) {
  return await fetch(request);
}

async function addNewAssetsToCache() {
  const projectAssets = getProjectAssets();
  const cache = await caches.open(CACHES.STATIC);
  const cachedAssets = (await cache.keys()).map(request => request.url);
  const assetsToCache = projectAssets.filter(file => !cachedAssets.includes(file));

  await cache.addAll([APP_ENTRYPOINT, ...assetsToCache]);
}

async function removeOldCaches() {
  const activeCacheNames = Object.values(CACHES);
  const cacheNames = await caches.keys();

  for (const cacheName of cacheNames) {
    if (!activeCacheNames.includes(cacheName)) {
      await caches.delete(cacheName);
    }
  }
}

async function removeOldAssetsFromCache() {
  const projectAssets = getProjectAssets();
  const cache = await caches.open(CACHES.STATIC);
  const cachedAssets = (await cache.keys()).map(request => request.url);
  const assetsToRemove = cachedAssets.filter(file => !projectAssets.includes(file));

  for (const asset of assetsToRemove) {
    await cache.delete(asset);
  }
}

function getProjectAssets() {
  return Object.values(files).map(prepareFullUrl)
    .filter(asset => !asset.includes('.map') && !asset.includes('service-worker.js'));
}

function prepareFullUrl(path) {
  const url = new URL(path, location.href);
  return url.href;
}
