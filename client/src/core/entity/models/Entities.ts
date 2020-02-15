import { Article } from '../../../modules/article/models/Article';
import { Blog } from '../../../modules/blog/models/Blog';
import { Category } from '../../../modules/category/models/Category';
import { Dictionary } from '../../../common/models/Dictionary';

export interface Entities {
  articles?: Dictionary<Article>;
  blogs?: Dictionary<Blog>;
  categories?: Dictionary<Category>;
}
