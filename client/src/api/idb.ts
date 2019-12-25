import { openDB } from 'idb';

export async function openIndexedDb() {
  return openDB('rss-reader', 2, {
    upgrade(db, oldVersion) {
      const articleStore = db.createObjectStore('articles', { keyPath: 'id' });
      const blogStore = db.createObjectStore('blogs', { keyPath: 'id' });
      const categoryStore = db.createObjectStore('categories', { keyPath: 'id' });

      articleStore.createIndex('date', 'date');
      blogStore.createIndex('name', 'name');
      categoryStore.createIndex('name', 'name');
    },
  });
}
