import { getFromCache, getFromNetworkAndPutIntoCache } from './utils';

export async function cacheFirst(request, { cacheName }) {
  return await getFromCache(request.clone(), cacheName) || await getFromNetworkAndPutIntoCache(request, cacheName);
}
