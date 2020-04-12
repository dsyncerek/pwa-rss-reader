import { createReducer, Dictionary } from '@reduxjs/toolkit';
import {
  fetchArticlesPage,
  fetchBlogArticlesPage,
  fetchCategoryArticlesPage,
} from '../../features/article/article.actions';
import { createBlog, deleteBlog } from '../../features/blog/blog.actions';
import { deleteCategory } from '../../features/category/category.actions';
import { merge, PaginationStatus } from './models/PaginationStatus';

export const paginationFeatureKey = 'pagination';

export interface PaginationState {
  articles: {
    all?: PaginationStatus;
    byBlog: Dictionary<PaginationStatus>;
    byCategory: Dictionary<PaginationStatus>;
  };
}

export const initialState: PaginationState = {
  articles: {
    byBlog: {},
    byCategory: {},
  },
};

export const paginationReducer = createReducer(initialState, builder => {
  builder.addCase(fetchArticlesPage.fulfilled, (state, { payload }) => {
    state.articles.all = merge(state.articles.all, payload.response);
  });
  builder.addCase(fetchBlogArticlesPage.fulfilled, (state, { payload, meta: { arg } }) => {
    state.articles.byBlog[arg.blogId] = merge(state.articles.byBlog[arg.blogId], payload.response);
  });
  builder.addCase(fetchCategoryArticlesPage.fulfilled, (state, { payload, meta: { arg } }) => {
    state.articles.byCategory[arg.categoryId] = merge(state.articles.byCategory[arg.categoryId], payload.response);
  });
  builder.addCase(createBlog.fulfilled, (state, { meta: { arg } }) => {
    delete state.articles.all;
    delete state.articles.byCategory[arg.blog.categoryId];
  });
  builder.addCase(deleteBlog.fulfilled, (state, { meta: { arg } }) => {
    delete state.articles.all;
    delete state.articles.byBlog[arg.id];
  });
  builder.addCase(deleteCategory.fulfilled, (state, { meta: { arg } }) => {
    delete state.articles.all;
    delete state.articles.byCategory[arg.id];
  });
});
