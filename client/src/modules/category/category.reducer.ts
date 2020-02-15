import { CategoryAction, CategoryActionTypes } from './category.action-types';

export interface CategoryState {
  allLoaded: boolean;
}

export const initialState: CategoryState = {
  allLoaded: false,
};

export function categoryReducer(state: CategoryState = initialState, action: CategoryAction): CategoryState {
  switch (action.type) {
    case CategoryActionTypes.FETCH_ALL_CATEGORIES_SUCCESS:
      return { ...state, allLoaded: true };

    default:
      return state;
  }
}
