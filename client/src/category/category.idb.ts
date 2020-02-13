import { openIndexedDb } from '../core/idb';
import { Category } from './models/Category';

export async function fetchAllCategories(): Promise<Category[]> {
  const db = await openIndexedDb();
  return await db.getAll('categories');
}

export async function saveAllCategories(categories: Category[]): Promise<void> {
  const db = await openIndexedDb();
  const tx = db.transaction('categories', 'readwrite');

  tx.store.clear();
  categories.forEach(category => tx.store.put(category));

  await tx.done;
}

export async function saveCategory(category: Category): Promise<void> {
  const db = await openIndexedDb();
  const tx = db.transaction('categories', 'readwrite');

  tx.store.put(category);

  await tx.done;
}

export async function deleteCategory(id: string) {
  const db = await openIndexedDb();
  const tx = db.transaction('categories', 'readwrite');

  tx.store.delete(id);

  await tx.done;
}
