import { schema } from 'normalizr';
import { Blog } from './Blog';

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: Date;
  link: string;
  summary: string;
  content: string;
  read: boolean;
  blogId: string;

  // only frontend
  blog?: Blog;
}

export const articleSchema = new schema.Entity('articles', {}, { idAttribute: 'id' });
