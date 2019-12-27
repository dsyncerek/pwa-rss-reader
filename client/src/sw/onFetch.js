import { API_URL_REGEX, APP_ENTRYPOINT, CACHES, FILE_URL_REGEX, REQUESTS_SYNC_HEADER, STATIC_ASSETS } from './constants';
import { cacheFirst } from './strategies/cacheFirst';
import { networkOnly } from './strategies/networkOnly';
import { networkOnlyWithBackgroundSync } from './strategies/networkOnlyWithBackgroundSync';
import { staleWhileRevalidate } from './strategies/staleWhileRevalidate';

export async function onFetch(event) {
  const { request } = event;
  const { url, method, mode, headers } = request;

  if (method !== 'GET') {
    if (headers.has(REQUESTS_SYNC_HEADER)) {
      console.log('GET, networkOnlyWithBackgroundSync', request.url);
      event.respondWith(networkOnlyWithBackgroundSync(request));
      return;
    }

    console.log('GET, networkOnly', request.url);
    event.respondWith(networkOnly(request));
    return;
  }

  if (STATIC_ASSETS.includes(url)) {
    console.log('Static asset, cacheFirst', request.url);
    event.respondWith(cacheFirst(request, { cacheName: CACHES.STATIC }));
    return;
  }

  if (url.match(API_URL_REGEX)) {
    console.log('API call, networkOnly', request.url);
    event.respondWith(networkOnly(request));
    return;
  }

  if (mode === 'navigate' && !url.match(FILE_URL_REGEX)) {
    console.log('Navigate, cacheFirst', request.url);
    event.respondWith(cacheFirst(APP_ENTRYPOINT, { cacheName: CACHES.STATIC }));
    return;
  }

  console.log('Other, staleWhileRevalidate', request.url);
  event.respondWith(staleWhileRevalidate(request, { cacheName: CACHES.RUNTIME }));
}
