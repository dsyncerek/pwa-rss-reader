import { schema } from 'normalizr';

export interface Category {
  id: string;
  name: string;
}

export const categorySchema = new schema.Entity('categories');

export interface SaveCategory {
  id?: string;
  name: string;
}
