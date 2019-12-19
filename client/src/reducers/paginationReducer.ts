import produce from 'immer';
import { ArticleActionTypes } from '../actions/articleActionTypes';
import { BlogActionTypes } from '../actions/blogActionTypes';
import { CategoryActionTypes } from '../actions/categoryActionTypes';
import { RootAction } from '../actions/rootTypes';
import { Dictionary } from '../models/Dictionary';
import { Pagination } from '../models/Pagination';

export interface PaginationState {
  articles: {
    all?: Pagination;
    byBlog: Dictionary<Pagination>;
    byCategory: Dictionary<Pagination>;
  };
}

export const initialState: PaginationState = {
  articles: {
    byBlog: {},
    byCategory: {},
  },
};

export function paginationReducer(state: PaginationState = initialState, action: RootAction): PaginationState {
  switch (action.type) {
    case ArticleActionTypes.FETCH_ARTICLES_PAGE_SUCCESS:
      return produce(state, draft => {
        draft.articles.all = updatePagination(action.pagination);
      });

    case ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS:
      return produce(state, draft => {
        draft.articles.byBlog[action.blogId] = updatePagination(action.pagination);
      });

    case ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS:
      return produce(state, draft => {
        draft.articles.byCategory[action.categoryId] = updatePagination(action.pagination);
      });

    case BlogActionTypes.CREATE_BLOG_SUCCESS:
      return produce(state, draft => {
        delete draft.articles.all;
        // delete draft.articles.byCategory[]; // todo
      });

    case BlogActionTypes.DELETE_BLOG_SUCCESS:
      return produce(state, draft => {
        delete draft.articles.all;
        delete draft.articles.byBlog[action.id];
      });

    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return produce(state, draft => {
        delete draft.articles.all;
        delete draft.articles.byCategory[action.id];
      });

    default:
      return state;
  }
}

function updatePagination(pagination: Pagination): Pagination {
  const { items, ...rest } = pagination;
  return { ...rest };
}
