import { openDB } from 'idb';

export async function openIndexedDb() {
  return openDB('rss-reader', 2, {
    upgrade(db) {
      const articleStore = db.createObjectStore('articles', { keyPath: 'id' });
      db.createObjectStore('blogs', { keyPath: 'id' });
      db.createObjectStore('categories', { keyPath: 'id' });

      articleStore.createIndex('date', 'date');
    },
  });
}
