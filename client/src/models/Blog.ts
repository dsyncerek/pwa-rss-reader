import { schema } from 'normalizr';

export interface Blog {
  id: string;
  name: string;
  slug: string;
  link: string;
  rss: string;
  icon: string;
  categoryId: string;
}

export const blogSchema = new schema.Entity('blogs', {}, { idAttribute: 'id' });

export interface SaveBlog {
  id?: string;
  rss: string;
  categoryId: string;
}
