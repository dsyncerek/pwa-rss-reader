import { ArticleActions, ArticleActionTypes } from '../actions/articleActionTypes';
import { Dictionary } from '../models/Dictionary';
import { AsyncState, asyncStateDefault, asyncStateError, asyncStateInit, asyncStateSuccess } from './utils';

interface PaginationState {
  totalItems: number;
  pageCount: number;
  currentPage: number;
}

export interface ArticleState extends AsyncState {
  all: PaginationState;
  byBlog: Dictionary<PaginationState>;
  byCategory: Dictionary<PaginationState>;
}

export const initialState: ArticleState = {
  ...asyncStateDefault(),
  all: { totalItems: 0, pageCount: 0, currentPage: 0 },
  byBlog: {},
  byCategory: {},
};

export function articleReducer(state: ArticleState = initialState, action: ArticleActions): ArticleState {
  switch (action.type) {
    case ArticleActionTypes.FETCH_ARTICLES_PAGE:
    case ArticleActionTypes.FETCH_ARTICLE:
    case ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE:
    case ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE:
      return { ...state, ...asyncStateInit() };

    case ArticleActionTypes.FETCH_ARTICLE_ERROR:
    case ArticleActionTypes.FETCH_ARTICLES_PAGE_ERROR:
    case ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_ERROR:
    case ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_ERROR:
      return { ...state, ...asyncStateError(action.error) };

    case ArticleActionTypes.FETCH_ARTICLE_SUCCESS:
      return { ...state, ...asyncStateSuccess() };

    case ArticleActionTypes.FETCH_ARTICLES_PAGE_SUCCESS:
      return {
        ...state,
        ...asyncStateSuccess(),
        all: {
          pageCount: action.pagination.pageCount,
          currentPage: action.pagination.currentPage,
          totalItems: action.pagination.totalItems,
        },
      };

    case ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS:
      return {
        ...state,
        ...asyncStateSuccess(),
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
        ...asyncStateSuccess(),
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
