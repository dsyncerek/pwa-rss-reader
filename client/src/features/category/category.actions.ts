import { createAsyncCallThunk } from '../../common/utils/createAsyncCallThunk';
import { showErrorToast, showSuccessToast } from '../../core/toast/toast.actions';
import * as categoryApi from './category.api';
import * as categoryIdb from './category.idb';
import { Category, categorySchema, SaveCategory } from './models/Category';

export const initCategoriesFromIdb = createAsyncCallThunk(`category/initCategoriesFromIdb`, () => ({
  call: () => categoryIdb.fetchAllCategories(),
  schema: [categorySchema],
}));

export const fetchAllCategories = createAsyncCallThunk<Category[]>(`category/fetchAllCategories`, () => ({
  call: () => categoryApi.fetchAllCategories(),
  shouldCall: state => !state.category.allLoaded,
  schema: [categorySchema],
  onSuccess: categories => categoryIdb.saveAllCategories(categories).catch(),
}));

export const createCategory = createAsyncCallThunk<Category, { category: SaveCategory }>(
  `category/createCategory`,
  ({ category }, { dispatch }) => ({
    call: () => categoryApi.createCategory(category),
    schema: categorySchema,
    onSuccess: category => {
      dispatch(showSuccessToast('Category has been created.'));
      categoryIdb.saveCategory(category).catch();
    },
  }),
);

export const updateCategory = createAsyncCallThunk<Category, { category: SaveCategory }>(
  `category/updateCategory`,
  ({ category }, { dispatch }) => ({
    call: () => categoryApi.updateCategory(category),
    schema: categorySchema,
    onSuccess: category => {
      dispatch(showSuccessToast('Category has been updated.'));
      categoryIdb.saveCategory(category).catch();
    },
  }),
);

export const deleteCategory = createAsyncCallThunk<void, { id: string }>(
  `category/deleteCategory`,
  ({ id }, { dispatch }) => ({
    call: () => categoryApi.deleteCategory(id),
    onError: error => dispatch(showErrorToast(error.message)),
    onSuccess: () => {
      dispatch(showSuccessToast('Category has been deleted.'));
      categoryIdb.deleteCategory(id).catch();
    },
  }),
);
