import { CACHES, STATIC_ASSETS } from './constants';

export async function onInstall(event) {
  console.log('onInstall');

  event.waitUntil(addNewAssetsToCache());
}

async function addNewAssetsToCache() {
  const cache = await caches.open(CACHES.STATIC);
  const cachedAssets = (await cache.keys()).map(request => request.url);
  const assetsToCache = STATIC_ASSETS.filter(file => !cachedAssets.includes(file));

  await cache.addAll(assetsToCache);
}
