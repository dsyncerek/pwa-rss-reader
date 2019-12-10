import { ArticleActions, ArticleActionTypes } from '../actions/articleActionTypes';
import { AsyncState, asyncStateDefault, asyncStateError, asyncStateInit, asyncStateSuccess } from './utils';

export interface ArticleState extends AsyncState {
  // todo
}

export const initialState: ArticleState = {
  ...asyncStateDefault(),
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
    case ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS:
    case ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS:
      return { ...state, ...asyncStateSuccess() }; // todo

    default:
      return state;
  }
}
