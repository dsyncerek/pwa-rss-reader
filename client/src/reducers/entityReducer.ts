import produce from 'immer';
import { ArticleActionTypes } from '../actions/articleActionTypes';
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
    case ArticleActionTypes.MARK_ARTICLE_AS_READ_OPTIMISTIC:
      return produce(state, draft => {
        draft.articles[action.id].read = true;
      });

    case ArticleActionTypes.MARK_ARTICLE_AS_UNREAD_OPTIMISTIC:
      return produce(state, draft => {
        draft.articles[action.id].read = false;
      });

    case BlogActionTypes.DELETE_BLOG_SUCCESS:
      return produce(state, draft => {
        delete draft.blogs[action.id];
      });

    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return produce(state, draft => {
        delete draft.categories[action.id];
      });

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
