import { Article } from '../../../features/article/models/Article';
import { Blog } from '../../../features/blog/models/Blog';
import { Category } from '../../../features/category/models/Category';
import { Dictionary } from '../../../common/models/Dictionary';

export interface Entities {
  articles?: Dictionary<Article>;
  blogs?: Dictionary<Blog>;
  categories?: Dictionary<Category>;
}
