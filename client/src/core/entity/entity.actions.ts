import { normalize } from 'normalizr';
import { fetchAllArticles } from '../../features/article/article.idb';
import { articleSchema } from '../../features/article/models/Article';
import { fetchAllBlogs } from '../../features/blog/blog.idb';
import { blogSchema } from '../../features/blog/models/Blog';
import { fetchAllCategories } from '../../features/category/category.idb';
import { categorySchema } from '../../features/category/models/Category';
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
