import { AnyAction } from 'redux';
import { BlogActionTypes } from '../actions/blogActionTypes';
import { CategoryActionTypes } from '../actions/categoryActionTypes';
import { Article } from '../models/Article';
import { Blog } from '../models/Blog';
import { Category } from '../models/Category';
import { Dictionary } from '../models/Dictionary';

export interface EntityState {
  articles: Dictionary<Article>;
  blogs: Dictionary<Blog>;
  categories: Dictionary<Category>;
}

export const initialState: EntityState = {
  articles: {},
  blogs: {},
  categories: {},
};

export function entityReducer(state: EntityState = initialState, action: AnyAction): EntityState {
  if (action.entities) {
    return {
      ...state,
      articles: { ...state.articles, ...action.entities.articles },
      blogs: { ...state.blogs, ...action.entities.blogs },
      categories: { ...state.categories, ...action.entities.categories },
    };
  }

  switch (action.type) {
    case BlogActionTypes.DELETE_BLOG_SUCCESS:
      return { ...state, blogs: removeEntity(state.blogs, action.id) };
    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return { ...state, categories: removeEntity(state.categories, action.id) };
    default:
      return state;
  }
}

function removeEntity(coll: Dictionary, id: string): Dictionary {
  const { [id]: removed, ...rest } = coll;
  return { ...rest };
}
