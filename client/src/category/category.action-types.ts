import { Entities } from '../core/entity/models/Entities';
import { HttpError } from '../common/models/HttpError';
import { SaveCategory } from './models/Category';

export enum CategoryActionTypes {
  FETCH_ALL_CATEGORIES = 'FETCH_ALL_CATEGORIES',
  FETCH_ALL_CATEGORIES_SUCCESS = 'FETCH_ALL_CATEGORIES_SUCCESS',
  FETCH_ALL_CATEGORIES_ERROR = 'FETCH_ALL_CATEGORIES_ERROR',

  CREATE_CATEGORY = 'CREATE_CATEGORY',
  CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS',
  CREATE_CATEGORY_ERROR = 'CREATE_CATEGORY_ERROR',

  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS',
  UPDATE_CATEGORY_ERROR = 'UPDATE_CATEGORY_ERROR',

  DELETE_CATEGORY = 'DELETE_CATEGORY',
  DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS',
  DELETE_CATEGORY_ERROR = 'DELETE_CATEGORY_ERROR',
}

export interface FetchAllCategoriesAction {
  type: CategoryActionTypes.FETCH_ALL_CATEGORIES;
}

export interface FetchAllCategoriesSuccessAction {
  type: CategoryActionTypes.FETCH_ALL_CATEGORIES_SUCCESS;
  entities: Entities;
}

export interface FetchAllCategoriesErrorAction {
  type: CategoryActionTypes.FETCH_ALL_CATEGORIES_ERROR;
  error: HttpError;
}

export interface CreateCategoryAction {
  type: CategoryActionTypes.CREATE_CATEGORY;
  category: SaveCategory;
}

export interface CreateCategorySuccessAction {
  type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS;
  entities: Entities;
}

export interface CreateCategoryErrorAction {
  type: CategoryActionTypes.CREATE_CATEGORY_ERROR;
  error: HttpError;
}

export interface UpdateCategoryAction {
  type: CategoryActionTypes.UPDATE_CATEGORY;
  category: SaveCategory;
}

export interface UpdateCategorySuccessAction {
  type: CategoryActionTypes.UPDATE_CATEGORY_SUCCESS;
  entities: Entities;
}

export interface UpdateCategoryErrorAction {
  type: CategoryActionTypes.UPDATE_CATEGORY_ERROR;
  error: HttpError;
}

export interface DeleteCategoryAction {
  type: CategoryActionTypes.DELETE_CATEGORY;
  id: string;
}

export interface DeleteCategorySuccessAction {
  type: CategoryActionTypes.DELETE_CATEGORY_SUCCESS;
  id: string;
}

export interface DeleteCategoryErrorAction {
  type: CategoryActionTypes.DELETE_CATEGORY_ERROR;
  error: HttpError;
}

export type CategoryAction =
  | FetchAllCategoriesAction
  | FetchAllCategoriesSuccessAction
  | FetchAllCategoriesErrorAction
  | CreateCategoryAction
  | CreateCategorySuccessAction
  | CreateCategoryErrorAction
  | UpdateCategoryAction
  | UpdateCategorySuccessAction
  | UpdateCategoryErrorAction
  | DeleteCategoryAction
  | DeleteCategorySuccessAction
  | DeleteCategoryErrorAction;
