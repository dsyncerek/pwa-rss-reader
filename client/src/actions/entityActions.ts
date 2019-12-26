import { normalize } from 'normalizr';
import { fetchAllArticles } from '../api/articleIdb';
import { fetchAllBlogs } from '../api/blogIdb';
import { fetchAllCategories } from '../api/categoryIdb';
import { articleSchema } from '../models/Article';
import { blogSchema } from '../models/Blog';
import { categorySchema } from '../models/Category';
import { EntityActionTypes } from './entityActionTypes';
import { RootThunkAction } from './rootTypes';

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
