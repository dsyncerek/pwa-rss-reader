import { BlogActionTypes } from '../actions/blogActionTypes';
import { CategoryActionTypes } from '../actions/categoryActionTypes';
import { RootAction, RootEntitiesType } from '../actions/rootTypes';
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

export function entityReducer(state: EntityState = initialState, action: RootAction): EntityState {
  if ('entities' in action) {
    return mergeEntities(state, action.entities);
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

function mergeEntities(state: EntityState, newEntities: RootEntitiesType): EntityState {
  return {
    ...state,
    articles: { ...state.articles, ...newEntities.articles },
    blogs: { ...state.blogs, ...newEntities.blogs },
    categories: { ...state.categories, ...newEntities.categories },
  };
}

function removeEntity(coll: Dictionary, id: string): Dictionary {
  const { [id]: removed, ...rest } = coll;
  return { ...rest };
}
