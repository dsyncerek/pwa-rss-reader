import { CategoryActions, CategoryActionTypes } from '../actions/categoryActionTypes';
import { AsyncState, asyncStateDefault, asyncStateError, asyncStateInit, asyncStateSuccess } from './utils';

export interface CategoryState extends AsyncState {
  allLoaded: boolean;
}

export const initialState: CategoryState = {
  ...asyncStateDefault(),
  allLoaded: false,
};

export function categoryReducer(state: CategoryState = initialState, action: CategoryActions): CategoryState {
  switch (action.type) {
    case CategoryActionTypes.CREATE_CATEGORY:
    case CategoryActionTypes.DELETE_CATEGORY:
    case CategoryActionTypes.FETCH_ALL_CATEGORIES:
    case CategoryActionTypes.FETCH_CATEGORY:
    case CategoryActionTypes.UPDATE_CATEGORY:
      return { ...state, ...asyncStateInit() };

    case CategoryActionTypes.CREATE_CATEGORY_ERROR:
    case CategoryActionTypes.FETCH_ALL_CATEGORIES_ERROR:
    case CategoryActionTypes.DELETE_CATEGORY_ERROR:
    case CategoryActionTypes.FETCH_CATEGORY_ERROR:
    case CategoryActionTypes.UPDATE_CATEGORY_ERROR:
      return { ...state, ...asyncStateError(action.error) };

    case CategoryActionTypes.CREATE_CATEGORY_SUCCESS:
    case CategoryActionTypes.FETCH_CATEGORY_SUCCESS:
    case CategoryActionTypes.UPDATE_CATEGORY_SUCCESS:
    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return { ...state, ...asyncStateSuccess() };

    case CategoryActionTypes.FETCH_ALL_CATEGORIES_SUCCESS:
      return { ...state, ...asyncStateSuccess(), allLoaded: true };

    default:
      return state;
  }
}
