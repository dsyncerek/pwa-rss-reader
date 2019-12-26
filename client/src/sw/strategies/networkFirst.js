import { getFromCache, getFromNetworkAndPutIntoCache } from './utils';

export async function networkFirst(request, { cacheName }) {
  try {
    return await getFromNetworkAndPutIntoCache(request, cacheName);
  } catch (error) {
    const responseFromCache = await getFromCache(request, cacheName);
    
    if (responseFromCache) {
      return responseFromCache;
    } else {
      throw error;
    }
  }
}
