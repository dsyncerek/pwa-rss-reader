import { API_URL_REGEX, APP_ENTRYPOINT, CACHES, FILE_URL_REGEX, STATIC_ASSETS } from './constants';
import { cacheFirst } from './strategies/cacheFirst';
import { networkOnly } from './strategies/networkOnly';
import { staleWhileRevalidate } from './strategies/staleWhileRevalidate';

export async function onFetch(event) {
  const { request } = event;
  const { url, method, mode } = request;

  if (method !== 'GET') {
    console.log('GET, networkOnly', request.url);
    event.respondWith(networkOnly(request));
    // event.respondWith(networkOnlyWithBackgroundSync(request)); // todo
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
