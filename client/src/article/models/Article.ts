import { schema } from 'normalizr';
import { Blog, blogSchema } from '../../blog/models/Blog';

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: Date;
  link: string;
  content: string;
  read: boolean;
  blogId: string;

  // only frontend
  blog?: Blog;
}

export const articleSchema = new schema.Entity(
  'articles',
  { blog: blogSchema },
  { processStrategy: (value: Article) => ({ ...value, blog: value.blogId }) },
);
