export async function serializeRequest(request) {
  const serializedRequest = {
    url: request.url,
    headers: {},
    method: request.method,
    referrer: request.referer,
    referrerPolicy: request.referrerPolicy,
    mode: request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    integrity: request.integrity,
    keepalive: request.keepalive,
  };

  if (request.method !== 'GET') {
    serializedRequest.body = await request.clone().arrayBuffer();
  }

  for (const [key, value] of request.headers.entries()) {
    serializedRequest.headers[key] = value;
  }

  if (serializedRequest.mode === 'navigate') {
    serializedRequest.mode = 'same-origin';
  }

  return serializedRequest;
}

export function deserializeRequest(serializedRequest) {
  return new Request(serializedRequest.url, serializedRequest);
}
