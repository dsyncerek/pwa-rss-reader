/* eslint-disable no-restricted-globals */

import { files } from '../build/asset-manifest.json';

const CACHES = {
  STATIC: 'static-cache-v1',
  RUNTIME: 'runtime-cache-v1',
  API: 'api-cache-v1',
};

const APP_ENTRYPOINT = '/index.html';

const STATIC_ASSETS = Object.values(files)
  .filter(asset => !asset.includes('.map') && !asset.includes('service-worker.js'))
  .map(asset => new URL(asset, location.href).href);

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
self.addEventListener('message', console.log);
self.addEventListener('sync', console.log);
self.addEventListener('push', console.log);

/**
 * FETCHING
 */

async function onFetch(event) {
  const { request } = event;
  const { url, method, mode } = request;

  if (method !== 'GET') {
    event.respondWith(networkOnly(request));
    return;
  }

  if (STATIC_ASSETS.includes(url)) {
    event.respondWith(cacheFirst(request, { cacheName: CACHES.STATIC }));
    return;
  }

  if (url.match(/\/api\//)) {
    event.respondWith(networkFirst(request, { cacheName: CACHES.API }));
    return;
  }

  if (mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(APP_ENTRYPOINT, { cacheName: CACHES.STATIC }));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, { cacheName: CACHES.RUNTIME }));
}

/**
 * STRATEGIES
 */

async function staleWhileRevalidate(request, { cacheName }) {
  let response;

  try {
    response = await getFromCache(request, cacheName);
  } catch {
    return await getFromNetworkAndCache(request, cacheName);
  }

  getFromNetworkAndCache(request, cacheName);
  return response;
}

async function cacheFirst(request, { cacheName }) {
  try {
    return await getFromCache(request, cacheName);
  } catch {
    return await getFromNetworkAndCache(request, cacheName);
  }
}

async function networkFirst(request, { cacheName }) {
  try {
    return await getFromNetworkAndCache(request, cacheName);
  } catch (error) {
    try {
      return await getFromCache(request, cacheName);
    } catch {
      throw error;
    }
  }
}

async function networkOnly(request) {
  return await getFromNetwork(request);
}

async function getFromCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  const response = await cache.match(request);

  if (!response) {
    throw new Error('Request is not in cache.');
  }

  return response;
}

async function getFromNetworkAndCache(request, cacheName) {
  const response = await getFromNetwork(request);
  await putIntoCache(request, response, cacheName);
  return response;
}

async function getFromNetwork(request) {
  return await fetch(request);
}

async function putIntoCache(request, response, cacheName) {
  if (request.method !== 'GET') {
    return;
  }

  if (response.status !== 200 && response.status !== 0) {
    return;
  }

  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
}

/**
 * INSTALLING
 */

async function onInstall() {
  console.log('onInstall');

  await addNewAssetsToCache();
}

async function addNewAssetsToCache() {
  const cache = await caches.open(CACHES.STATIC);
  const cachedAssets = (await cache.keys()).map(request => request.url);
  const assetsToCache = STATIC_ASSETS.filter(file => !cachedAssets.includes(file));

  await cache.addAll(assetsToCache);
}

/**
 * ACTIVATING
 */

async function onActivate() {
  console.log('onActivate');

  await removeOldCaches();
  await removeOldAssetsFromCache();
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
  const cache = await caches.open(CACHES.STATIC);
  const cachedAssets = (await cache.keys()).map(request => request.url);
  const assetsToRemove = cachedAssets.filter(file => !STATIC_ASSETS.includes(file));

  for (const asset of assetsToRemove) {
    await cache.delete(asset);
  }
}
