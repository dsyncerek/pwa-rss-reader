import { CACHES, STATIC_ASSETS } from './constants';

export async function onActivate(event) {
  console.log('onActivate');

  event.waitUntil(Promise.all([removeOldCaches(), removeOldAssetsFromCache()]));
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
