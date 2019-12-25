import { Article } from '../models/Article';
import { openIndexedDb } from './idb';

export async function fetchAllArticles(): Promise<Article[]> {
  const db = await openIndexedDb();
  return await db.getAllFromIndex('articles', 'date');
}

export async function saveArticles(articles: Article[]): Promise<void> {
  const db = await openIndexedDb();
  const tx = db.transaction('article', 'readwrite');

  articles.forEach(blog => tx.store.put(blog));

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
