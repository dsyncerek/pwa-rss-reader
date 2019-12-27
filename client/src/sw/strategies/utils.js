export async function getFromCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  return await cache.match(request);
}

export async function getFromNetwork(request, timeout = 3000) {
  return Promise.race([
    fetch(request.clone()),
    new Promise(((resolve, reject) => setTimeout(reject, timeout))),
  ]);
}

export async function getFromNetworkAndPutIntoCache(request, cacheName) {
  const response = await getFromNetwork(request);
  putIntoCache(request, response, cacheName).catch();
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
