import { openDB } from 'idb';
import { normalize } from 'normalizr';
import { articleSchema } from '../models/Article';

export async function openIndexedDb() {
  return openDB('rss-reader', 1, {
    upgrade(db) {
      const articleStore = db.createObjectStore('articles', { keyPath: 'id' });
      articleStore.createIndex('date', 'date');
      articleStore.createIndex('blogId', 'blogId');

      const blogStore = db.createObjectStore('blogs', { keyPath: 'id' });
      blogStore.createIndex('categoryId', 'categoryId');

      const categoryStore = db.createObjectStore('categories', { keyPath: 'id' });
    },
  });
}

export async function saveArticlesToIndexedDb(articles) {
  if (!articles) {
    return;
  }

  const db = await openIndexedDb();
  const tx = db.transaction('articles', 'readwrite');

  articles.forEach(article => tx.store.put(article));

  let cursor = await tx.store.index('date').openCursor(undefined, 'prev');

  if (cursor) {
    cursor = await cursor.advance(100);

    while (cursor) {
      await cursor.delete();
      cursor = await cursor.continue();
    }
  }

  await tx.done;
}

export async function getArticlesFromIndexedDb() {
  const db = await openIndexedDb();
  const articles = await db.getAllFromIndex('articles', 'date');
  const { entities } = normalize(articles, [articleSchema]);
  return entities;
}
