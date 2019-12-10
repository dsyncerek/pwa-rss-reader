import { BlogActions, BlogActionTypes } from '../actions/blogActionTypes';
import { AsyncState, asyncStateDefault, asyncStateError, asyncStateInit, asyncStateSuccess } from './utils';

export interface BlogState extends AsyncState {
  allLoaded: boolean;
}

export const initialState: BlogState = {
  ...asyncStateDefault(),
  allLoaded: false,
};

export function blogReducer(state: BlogState = initialState, action: BlogActions): BlogState {
  switch (action.type) {
    case BlogActionTypes.CREATE_BLOG:
    case BlogActionTypes.DELETE_BLOG:
    case BlogActionTypes.FETCH_ALL_BLOGS:
    case BlogActionTypes.FETCH_BLOG:
    case BlogActionTypes.UPDATE_BLOG:
      return { ...state, ...asyncStateInit() };

    case BlogActionTypes.CREATE_BLOG_ERROR:
    case BlogActionTypes.FETCH_ALL_BLOGS_ERROR:
    case BlogActionTypes.DELETE_BLOG_ERROR:
    case BlogActionTypes.FETCH_BLOG_ERROR:
    case BlogActionTypes.UPDATE_BLOG_ERROR:
      return { ...state, ...asyncStateError(action.error) };

    case BlogActionTypes.CREATE_BLOG_SUCCESS:
    case BlogActionTypes.FETCH_BLOG_SUCCESS:
    case BlogActionTypes.UPDATE_BLOG_SUCCESS:
    case BlogActionTypes.DELETE_BLOG_SUCCESS:
      return { ...state, ...asyncStateSuccess() };

    case BlogActionTypes.FETCH_ALL_BLOGS_SUCCESS:
      return { ...state, ...asyncStateSuccess(), allLoaded: true };

    default:
      return state;
  }
}
