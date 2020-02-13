import { Article } from '../../../article/models/Article';
import { Blog } from '../../../blog/models/Blog';
import { Category } from '../../../category/models/Category';
import { Dictionary } from '../../../common/models/Dictionary';

export interface Entities {
  articles?: Dictionary<Article>;
  blogs?: Dictionary<Blog>;
  categories?: Dictionary<Category>;
}
