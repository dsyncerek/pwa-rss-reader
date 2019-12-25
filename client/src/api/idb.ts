import { openDB } from 'idb';
import { IDBPDatabase } from 'idb/lib/entry';
import { normalize } from 'normalizr';
import { Article, articleSchema } from '../models/Article';
import { Dictionary } from '../models/Dictionary';

export async function openIndexedDb(): Promise<IDBPDatabase> {
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

export async function saveArticlesToIndexedDb(articles?: Article[]): Promise<void> {
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

export async function getArticlesFromIndexedDb(): Promise<Dictionary<Article>> {
  const db = await openIndexedDb();
  const articles = await db.getAllFromIndex('articles', 'date');
  const { entities } = normalize(articles, [articleSchema]);
  return entities;
}
