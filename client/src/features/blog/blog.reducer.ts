import { BlogAction, BlogActionTypes } from './blog.action-types';

export interface BlogState {
  allLoaded: boolean;
}

export const initialState: BlogState = {
  allLoaded: false,
};

export function blogReducer(state: BlogState = initialState, action: BlogAction): BlogState {
  switch (action.type) {
    case BlogActionTypes.FETCH_ALL_BLOGS_SUCCESS:
      return { ...state, allLoaded: true };

    default:
      return state;
  }
}
