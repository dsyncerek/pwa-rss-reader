import { IDBPTransaction } from 'idb';
import { Article } from '../models/Article';
import { openIndexedDb } from './idb';

export async function fetchAllArticles(): Promise<Article[]> {
  const db = await openIndexedDb();
  return await db.getAll('articles');
}

export async function saveArticles(articles: Article[]): Promise<void> {
  const db = await openIndexedDb();
  const tx = db.transaction('articles', 'readwrite');

  articles.forEach(blog => tx.store.put(blog));

  await removeOldArticles(tx, getLastMonthDate());

  await tx.done;
}

export async function updateArticle(id: string, partial: Partial<Article>): Promise<void> {
  const db = await openIndexedDb();
  const tx = db.transaction('articles', 'readwrite');
  const article = await tx.store.get(id);

  tx.store.put({ id, ...article, ...partial });

  await tx.done;
}

async function removeOldArticles(tx: IDBPTransaction<unknown, ['articles']>, date: Date): Promise<void> {
  const query = IDBKeyRange.upperBound(date.toJSON());
  let cursor = await tx.store.index('date').openCursor(query, 'prev');

  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }
}

function getLastMonthDate(): Date {
  const now = Date.now();
  const month = 1000 * 60 * 60 * 24 * 7 * 4;

  return new Date(now - month);
}
