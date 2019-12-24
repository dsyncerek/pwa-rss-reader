import { schema } from 'normalizr';

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
}

export const articleSchema = new schema.Entity('articles', {}, { idAttribute: 'id' });
