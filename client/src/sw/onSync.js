import { REQUESTS_SYNC_EVENT_TAG } from './constants';
import { requestStore } from './utils/requestStore';

let syncInProgress = false;
let requestsAddedDuringSync = false;

export async function onSync(event) {
  if (event.tag === REQUESTS_SYNC_EVENT_TAG) {
    event.waitUntil(replayRequests());
  }
}

export async function replayRequests() {
  syncInProgress = true;

  try {
    const requests = await requestStore.getAll();

    for (const [id, request] of Object.entries(requests)) {
      await fetch(request);
      await requestStore.delete(parseInt(id));
    }
  } finally {
    syncInProgress = false;
    requestsAddedDuringSync = false;

    if (requestsAddedDuringSync) {
      await registerSync();
    }
  }
}

export async function addRequest(request) {
  await requestStore.add(request);

  if (syncInProgress) {
    requestsAddedDuringSync = true;
  } else {
    await registerSync();
  }
}

async function registerSync() {
  if ('sync' in self.registration) {
    await self.registration.sync.register(REQUESTS_SYNC_EVENT_TAG);
  }
}
