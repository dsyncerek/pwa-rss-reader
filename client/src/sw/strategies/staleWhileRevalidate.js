import { getFromCache, getFromNetworkAndPutIntoCache } from './utils';

export async function staleWhileRevalidate(request, { cacheName }) {
  const responseFromCache = await getFromCache(request, cacheName);

  if (responseFromCache) {
    getFromNetworkAndPutIntoCache(request.clone(), cacheName).catch();
    return responseFromCache;
  } else {
    return await getFromNetworkAndPutIntoCache(request.clone(), cacheName);
  }
}
