import { Blog } from '../models/Blog';
import { openIndexedDb } from './idb';

export async function fetchAllBlogs(): Promise<Blog[]> {
  const db = await openIndexedDb();
  return await db.getAll('blogs');
}

export async function saveAllBlogs(blogs: Blog[]): Promise<void> {
  const db = await openIndexedDb();
  const tx = db.transaction('blogs', 'readwrite');

  tx.store.clear();
  blogs.forEach(blog => tx.store.put(blog));

  await tx.done;
}

export async function saveBlog(blog: Blog): Promise<void> {
  const db = await openIndexedDb();
  const tx = db.transaction('blogs', 'readwrite');

  tx.store.put(blog);

  await tx.done;
}

export async function deleteBlog(id: string) {
  const db = await openIndexedDb();
  const tx = db.transaction('blogs', 'readwrite');

  tx.store.delete(id);

  await tx.done;
}
