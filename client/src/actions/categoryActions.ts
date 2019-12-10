import * as categoryApi from '../api/categoryApi';
import { categorySchema, SaveCategory } from '../models/Category';
import { RootState } from '../reducers';
import { CategoryActions, CategoryActionTypes } from './categoryActionTypes';
import { AsyncAction } from './types';

export function fetchAllCategories(): AsyncAction<CategoryActions> {
  return {
    callApi: async () => categoryApi.fetchAllCategories(),
    shouldCallApi: (state: RootState) => !state.categoryState.allLoaded,
    schema: [categorySchema],

    initAction: () => ({ type: CategoryActionTypes.FETCH_ALL_CATEGORIES }),
    successAction: entities => ({ type: CategoryActionTypes.FETCH_ALL_CATEGORIES_SUCCESS, entities }),
    errorAction: error => ({ type: CategoryActionTypes.FETCH_ALL_CATEGORIES_ERROR, error }),
  };
}

export function fetchCategory(id: string): AsyncAction<CategoryActions> {
  return {
    callApi: async () => categoryApi.fetchCategory(id),
    shouldCallApi: (state: RootState) => !state.entityState.categories[id],
    schema: categorySchema,

    initAction: () => ({ type: CategoryActionTypes.FETCH_CATEGORY, id }),
    successAction: entities => ({ type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS, entities }),
    errorAction: error => ({ type: CategoryActionTypes.FETCH_CATEGORY_ERROR, error }),
  };
}

export function createCategory(category: SaveCategory): AsyncAction<CategoryActions> {
  return {
    callApi: async () => categoryApi.createCategory(category),
    schema: categorySchema,

    initAction: () => ({ type: CategoryActionTypes.CREATE_CATEGORY, category }),
    successAction: entities => ({ type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS, entities }),
    errorAction: error => ({ type: CategoryActionTypes.CREATE_CATEGORY_ERROR, error }),
  };
}

export function updateCategory(category: SaveCategory): AsyncAction<CategoryActions> {
  return {
    callApi: async () => categoryApi.updateCategory(category),
    schema: categorySchema,

    initAction: () => ({ type: CategoryActionTypes.UPDATE_CATEGORY, category }),
    successAction: entities => ({ type: CategoryActionTypes.UPDATE_CATEGORY_SUCCESS, entities }),
    errorAction: error => ({ type: CategoryActionTypes.UPDATE_CATEGORY_ERROR, error }),
  };
}

export function deleteCategory(id: string): AsyncAction<CategoryActions> {
  return {
    callApi: async () => categoryApi.deleteCategory(id),

    initAction: () => ({ type: CategoryActionTypes.DELETE_CATEGORY, id }),
    successAction: () => ({ type: CategoryActionTypes.DELETE_CATEGORY_SUCCESS, id }),
    errorAction: error => ({ type: CategoryActionTypes.DELETE_CATEGORY_ERROR, error }),
  };
}
