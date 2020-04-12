import { Article } from '../../features/article/models/Article';
import { Blog } from '../../features/blog/models/Blog';
import { Category } from '../../features/category/models/Category';

export interface Entities {
  articles?: Record<string, Article>;
  blogs?: Record<string, Blog>;
  categories?: Record<string, Category>;
}
