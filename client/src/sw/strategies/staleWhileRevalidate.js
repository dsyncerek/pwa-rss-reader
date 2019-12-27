import { getFromCache, getFromNetworkAndPutIntoCache } from './utils';

export async function staleWhileRevalidate(request, { cacheName }) {
  const responseFromCache = await getFromCache(request.clone(), cacheName);

  if (responseFromCache) {
    getFromNetworkAndPutIntoCache(request, cacheName).catch();
    return responseFromCache;
  } else {
    return await getFromNetworkAndPutIntoCache(request, cacheName);
  }
}
