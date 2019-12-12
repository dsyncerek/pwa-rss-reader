import * as categoryApi from '../api/categoryApi';
import { Category, categorySchema, SaveCategory } from '../models/Category';
import { RootState } from '../reducers';
import { CategoryActionTypes } from './categoryActionTypes';
import { apiCallThunkAction } from './rootActions';
import { RootThunkAction } from './rootTypes';
import { showErrorToast, showSuccessToast } from './toastActions';

export function fetchAllCategories(): RootThunkAction {
  return apiCallThunkAction<Category[]>({
    callApi: async () => categoryApi.fetchAllCategories(),
    shouldCallApi: (state: RootState) => !state.categoryState.allLoaded,
    schema: [categorySchema],

    onInit: () => dispatch => {
      dispatch({ type: CategoryActionTypes.FETCH_ALL_CATEGORIES });
    },
    onSuccess: entities => dispatch => {
      dispatch({ type: CategoryActionTypes.FETCH_ALL_CATEGORIES_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch({ type: CategoryActionTypes.FETCH_ALL_CATEGORIES_ERROR, error });
    },
  });
}

export function fetchCategory(id: string): RootThunkAction {
  return apiCallThunkAction<Category>({
    callApi: async () => categoryApi.fetchCategory(id),
    shouldCallApi: (state: RootState) => !state.entityState.categories[id],
    schema: categorySchema,

    onInit: () => dispatch => {
      dispatch({ type: CategoryActionTypes.FETCH_CATEGORY, id });
    },
    onSuccess: entities => dispatch => {
      dispatch({ type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch({ type: CategoryActionTypes.FETCH_CATEGORY_ERROR, error });
    },
  });
}

export function createCategory(category: SaveCategory): RootThunkAction {
  return apiCallThunkAction<Category>({
    callApi: async () => categoryApi.createCategory(category),
    schema: categorySchema,

    onInit: () => dispatch => {
      dispatch({ type: CategoryActionTypes.CREATE_CATEGORY, category });
    },
    onSuccess: entities => dispatch => {
      dispatch(showSuccessToast('Category has been created.'));
      dispatch({ type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch({ type: CategoryActionTypes.CREATE_CATEGORY_ERROR, error });
    },
  });
}

export function updateCategory(category: SaveCategory): RootThunkAction {
  return apiCallThunkAction<Category>({
    callApi: async () => categoryApi.updateCategory(category),
    schema: categorySchema,

    onInit: () => dispatch => {
      dispatch({ type: CategoryActionTypes.UPDATE_CATEGORY, category });
    },
    onSuccess: entities => dispatch => {
      dispatch(showSuccessToast('Category has been updated.'));
      dispatch({ type: CategoryActionTypes.UPDATE_CATEGORY_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch({ type: CategoryActionTypes.UPDATE_CATEGORY_ERROR, error });
    },
  });
}

export function deleteCategory(id: string): RootThunkAction {
  return apiCallThunkAction<void>({
    callApi: async () => categoryApi.deleteCategory(id),

    onInit: () => dispatch => {
      dispatch({ type: CategoryActionTypes.DELETE_CATEGORY, id });
    },
    onSuccess: () => dispatch => {
      dispatch(showSuccessToast('Category has been deleted.'));
      dispatch({ type: CategoryActionTypes.DELETE_CATEGORY_SUCCESS, id });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: CategoryActionTypes.DELETE_CATEGORY_ERROR, error });
    },
  });
}
