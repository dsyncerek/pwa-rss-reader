import { openDB } from 'idb';
import { REQUESTS_DB_NAME, REQUESTS_TABLE } from '../constants';
import { deserializeRequest, serializeRequest } from './requestSerializer';

const dbPromise = openDB(REQUESTS_DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(REQUESTS_TABLE, { autoIncrement: true });
  },
});

export const requestStore = {
  async delete(id) {
    (await dbPromise).delete(REQUESTS_TABLE, id);
  },

  async add(request) {
    (await dbPromise).add(REQUESTS_TABLE, await serializeRequest(request));
  },

  async getAll() {
    const db = await dbPromise;
    const keys = await db.getAllKeys(REQUESTS_TABLE);
    const values = await db.getAll(REQUESTS_TABLE);

    const requests = {};

    for (let i = 0; i < keys.length; i++) {
      requests[keys[i]] = deserializeRequest(values[i]);
    }

    return requests;
  },
};
