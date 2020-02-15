import { normalize } from 'normalizr';
import { fetchAllArticles } from '../../modules/article/article.idb';
import { articleSchema } from '../../modules/article/models/Article';
import { fetchAllBlogs } from '../../modules/blog/blog.idb';
import { blogSchema } from '../../modules/blog/models/Blog';
import { fetchAllCategories } from '../../modules/category/category.idb';
import { categorySchema } from '../../modules/category/models/Category';
import { RootThunkAction } from '../../store/rootTypes';
import { EntityActionTypes } from './entity.action-types';

export function initEntitiesFromIndexedDb(): RootThunkAction {
  return async dispatch => {
    const articles = await fetchAllArticles();
    const blogs = await fetchAllBlogs();
    const categories = await fetchAllCategories();

    const { entities } = normalize(
      { articles, blogs, categories },
      { articles: [articleSchema], blogs: [blogSchema], categories: [categorySchema] },
    );

    dispatch({ type: EntityActionTypes.INIT_ENTITIES_FROM_INDEXEDDB, entities });
  };
}
