import { schema } from 'normalizr';
import { Category } from '../../category/models/Category';

export interface Blog {
  id: string;
  name: string;
  slug: string;
  link: string;
  rss: string;
  icon: string;
  categoryId: string;

  // only frontend
  category?: Category;
}

export const blogSchema = new schema.Entity('blogs', {}, { idAttribute: 'id' });

export interface SaveBlog {
  id?: string;
  rss: string;
  categoryId: string;
}
