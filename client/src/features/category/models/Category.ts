import { schema } from 'normalizr';

export interface Category {
  id: string;
  name: string;
}

export const categorySchema = new schema.Entity('categories');

export const categorySortComparer = (a: Category, b: Category) => a.name.localeCompare(b.name);

export interface SaveCategory {
  id?: string;
  name: string;
}
