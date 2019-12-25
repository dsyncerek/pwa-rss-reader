/* eslint-disable no-restricted-globals */

import localforage from 'localforage';

const backgroundSyncStore = localforage.createInstance({ name: 'requests' });
let syncInProgress = false;
let newRequestDuringSync = false;

async function onSync(event) {
  if (event.tag === 'sync-requests') {

  }
}

async function addRequestToSync(request) {
  await backgroundSyncStore.setItem('xd', serializeRequest(request));

  if (syncInProgress) {
    newRequestDuringSync = true;
  } else {
    await registerSync();
  }
}

async function registerSync() {
  if ('sync' in self.registration) {
    await self.registration.sync.register(`sync-requests`);
  }
}

async function serializeRequest(request) {
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

function deserializeRequest(serializedRequest) {
  return new Request(serializedRequest.url, serializedRequest);
}
