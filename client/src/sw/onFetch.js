import { CACHES, STATIC_ASSETS } from './constants';
import { cacheFirst } from './strategies/cacheFirst';
import { networkFirst } from './strategies/networkFirst';
import { networkOnly } from './strategies/networkOnly';
import { staleWhileRevalidate } from './strategies/staleWhileRevalidate';

export async function onFetch(event) {
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

  // if (mode === 'navigate') {
  //   event.respondWith(staleWhileRevalidate(APP_ENTRYPOINT, { cacheName: CACHES.STATIC }));
  //   return;
  // }

  event.respondWith(staleWhileRevalidate(request, { cacheName: CACHES.RUNTIME }));
}
