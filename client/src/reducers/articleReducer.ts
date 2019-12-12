import { ArticleAction, ArticleActionTypes } from '../actions/articleActionTypes';
import { Dictionary } from '../models/Dictionary';

interface PaginationState {
  totalItems: number;
  pageCount: number;
  currentPage: number;
}

export interface ArticleState {
  all: PaginationState;
  byBlog: Dictionary<PaginationState>;
  byCategory: Dictionary<PaginationState>;
}

export const initialState: ArticleState = {
  all: { totalItems: 0, pageCount: 0, currentPage: 0 },
  byBlog: {},
  byCategory: {},
};

export function articleReducer(state: ArticleState = initialState, action: ArticleAction): ArticleState {
  switch (action.type) {
    case ArticleActionTypes.FETCH_ARTICLES_PAGE_SUCCESS:
      return {
        ...state,
        all: {
          pageCount: action.pagination.pageCount,
          currentPage: action.pagination.currentPage,
          totalItems: action.pagination.totalItems,
        },
      };

    case ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS:
      return {
        ...state,
        byBlog: {
          ...state.byBlog,
          [action.blogId]: {
            pageCount: action.pagination.pageCount,
            currentPage: action.pagination.currentPage,
            totalItems: action.pagination.totalItems,
          },
        },
      };

    case ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS:
      return {
        ...state,
        byCategory: {
          ...state.byCategory,
          [action.categoryId]: {
            pageCount: action.pagination.pageCount,
            currentPage: action.pagination.currentPage,
            totalItems: action.pagination.totalItems,
          },
        },
      };

    default:
      return state;
  }
}
