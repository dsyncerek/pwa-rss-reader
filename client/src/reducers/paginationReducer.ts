import produce from 'immer';
import { ArticleActionTypes } from '../actions/articleActionTypes';
import { BlogActionTypes } from '../actions/blogActionTypes';
import { CategoryActionTypes } from '../actions/categoryActionTypes';
import { RootAction } from '../actions/rootTypes';
import { Dictionary } from '../models/Dictionary';
import { Pagination } from '../models/Pagination';

export interface PaginationStateSlice {
  totalItems: number;
  pageCount: number;
  loadedPages: number[];
}

export interface PaginationState {
  articles: {
    all?: PaginationStateSlice;
    byBlog: Dictionary<PaginationStateSlice>;
    byCategory: Dictionary<PaginationStateSlice>;
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
        draft.articles.all = updatePagination(action.pagination, draft.articles.all);
      });

    case ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS:
      return produce(state, draft => {
        draft.articles.byBlog[action.blogId] = updatePagination(
          action.pagination,
          draft.articles.byBlog[action.blogId],
        );
      });

    case ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS:
      return produce(state, draft => {
        draft.articles.byCategory[action.categoryId] = updatePagination(
          action.pagination,
          draft.articles.byCategory[action.categoryId],
        );
      });

    case BlogActionTypes.CREATE_BLOG_SUCCESS:
      return produce(state, draft => {
        delete draft.articles.all;
        delete draft.articles.byCategory[action.blog.categoryId];
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

function updatePagination(pagination: Pagination, state?: PaginationStateSlice): PaginationStateSlice {
  return {
    totalItems: pagination.totalItems,
    pageCount: pagination.pageCount,
    loadedPages: state?.loadedPages ? [...state.loadedPages, pagination.currentPage] : [pagination.currentPage],
  };
}
