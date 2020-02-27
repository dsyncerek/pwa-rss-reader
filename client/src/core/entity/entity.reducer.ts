import produce from 'immer';
import { Article } from '../../features/article/models/Article';
import { ArticleActionTypes } from '../../features/article/article.action-types';
import { Blog } from '../../features/blog/models/Blog';
import { BlogActionTypes } from '../../features/blog/blog.action-types';
import { Category } from '../../features/category/models/Category';
import { CategoryActionTypes } from '../../features/category/category.action-types';
import { RootAction } from '../../store/rootTypes';
import { Dictionary } from '../../common/models/Dictionary';
import { Entities } from './models/Entities';

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

function mergeEntities(state: EntityState, newEntities: Entities): EntityState {
  return {
    ...state,
    articles: { ...state.articles, ...newEntities.articles },
    blogs: { ...state.blogs, ...newEntities.blogs },
    categories: { ...state.categories, ...newEntities.categories },
  };
}
