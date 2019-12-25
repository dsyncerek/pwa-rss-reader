export async function getFromCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  return await cache.match(request);
}

export async function getFromNetwork(request) {
  return await fetch(request);
}

export async function getFromNetworkAndPutIntoCache(request, cacheName) {
  const response = await getFromNetwork(request);
  await putIntoCache(request, response, cacheName);
  return response;
}

async function putIntoCache(request, response, cacheName) {
  if (canCache(request, response)) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
  }
}

function canCache(request, response) {
  if (request.method !== 'GET') {
    return false;
  }

  if (response.status !== 200 && response.status !== 0) {
    return false;
  }

  return true;
}
