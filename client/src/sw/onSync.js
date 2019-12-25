import { openDB } from 'idb';
import { REQUESTS_DB_NAME, REQUESTS_SYNC_EVENT_TAG, REQUESTS_TABLE } from './constants';

let syncInProgress = false;
let requestsAddedDuringSync = false;

const dbPromise = openDB(REQUESTS_DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(REQUESTS_TABLE, { autoIncrement: true });
  },
});

export async function onSync(event) {
  if (event.tag === REQUESTS_SYNC_EVENT_TAG) {
    const syncPromise = async () => {
      syncInProgress = true;

      try {
        await replayRequests();
      } finally {
        if (requestsAddedDuringSync) {
          await registerSync();
        }

        syncInProgress = false;
        requestsAddedDuringSync = false;
      }
    };

    event.waitUntil(syncPromise());
  }
}

export async function replayRequests() {
  const serializedRequests = await getAllRequests();

  for (const [id, serializedRequest] of Object.entries(serializedRequests)) {
    const request = deserializeRequest(serializedRequest);

    await fetch(request);
    await deleteRequest(parseInt(id));
  }
}

export async function addRequest(request) {
  (await dbPromise).add(REQUESTS_TABLE, await serializeRequest(request));

  if (syncInProgress) {
    requestsAddedDuringSync = true;
  } else {
    await registerSync();
  }
}

async function deleteRequest(id) {
  (await dbPromise).delete(REQUESTS_TABLE, id);
}

async function getAllRequests() {
  const db = await dbPromise;
  const keys = await db.getAllKeys(REQUESTS_TABLE);
  const values = await db.getAll(REQUESTS_TABLE);

  const requests = {};

  for (let i = 0; i < keys.length; i++) {
    requests[keys[i]] = values[i];
  }

  return requests;
}

async function registerSync() {
  if ('sync' in self.registration) {
    await self.registration.sync.register(REQUESTS_SYNC_EVENT_TAG);
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
