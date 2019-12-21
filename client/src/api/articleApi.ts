import { openDB } from 'idb';
import { IDBPDatabase } from 'idb/lib/entry';
import { normalize } from 'normalizr';
import { Article, articleSchema } from '../models/Article';
import { Dictionary } from '../models/Dictionary';
import { Pagination } from '../models/Pagination';
import { axiosInstance } from './axiosInstance';

export async function fetchArticlesPage(page: number): Promise<Pagination<Article>> {
  return axiosInstance.get(`/articles/page/${page}`);
}

export async function fetchBlogArticlesPage(blogId: string, page: number): Promise<Pagination<Article>> {
  return axiosInstance.get(`/blogs/${blogId}/articles/page/${page}`);
}

export async function fetchCategoryArticlesPage(categoryId: string, page: number): Promise<Pagination<Article>> {
  return axiosInstance.get(`/categories/${categoryId}/articles/page/${page}`);
}

export async function fetchArticle(id: string): Promise<Article> {
  return axiosInstance.get(`/articles/${id}`);
}

export async function saveArticlesToIndexedDb(articles?: Article[]): Promise<void> {
  if (!articles) {
    return;
  }

  const db = await openArticlesIndexedDb();
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
  const db = await openArticlesIndexedDb();
  const articles = await db.getAllFromIndex('articles', 'date');
  const { entities } = normalize(articles, [articleSchema]);
  return entities;
}

async function openArticlesIndexedDb(): Promise<IDBPDatabase> {
  return openDB('rss-reader', 1, {
    upgrade(db) {
      const store = db.createObjectStore('articles', { keyPath: 'id' });
      store.createIndex('date', 'date');
    },
  });
}
