import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
  initCategoriesFromIdb,
  updateCategory,
} from './category.actions';
import { Category } from './models/Category';

export const categoryFeatureKey = 'category';
export const categoryAdapter = createEntityAdapter<Category>();

export interface CategoryState extends EntityState<Category> {
  allLoaded: boolean;
}

export const initialState: CategoryState = categoryAdapter.getInitialState({
  allLoaded: false,
});

export const categoryReducer = createReducer(initialState, builder => {
  builder.addCase(initCategoriesFromIdb.fulfilled, (state, { payload }) => {
    categoryAdapter.upsertMany(state, payload.entities?.categories || {});
  });
  builder.addCase(fetchAllCategories.fulfilled, (state, { payload }) => {
    categoryAdapter.upsertMany(state, payload.entities?.categories || {});
    state.allLoaded = true;
  });
  builder.addCase(createCategory.fulfilled, (state, { payload }) => {
    categoryAdapter.upsertMany(state, payload.entities?.categories || {});
  });
  builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
    categoryAdapter.upsertMany(state, payload.entities?.categories || {});
  });
  builder.addCase(deleteCategory.fulfilled, (state, { meta: { arg } }) => {
    categoryAdapter.removeOne(state, arg.id);
  });
});
