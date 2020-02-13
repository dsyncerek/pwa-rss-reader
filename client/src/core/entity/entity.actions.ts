import { normalize } from 'normalizr';
import { fetchAllArticles } from '../../article/article.idb';
import { articleSchema } from '../../article/models/Article';
import { fetchAllBlogs } from '../../blog/blog.idb';
import { blogSchema } from '../../blog/models/Blog';
import { fetchAllCategories } from '../../category/category.idb';
import { categorySchema } from '../../category/models/Category';
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
