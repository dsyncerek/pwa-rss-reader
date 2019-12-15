import { createSelector } from 'reselect';
import { Pagination } from '../models/Pagination';
import { RootState } from '../reducers';
import { PaginationState } from '../reducers/paginationReducer';

export const initialPagination: Pagination = { totalItems: 0, pageCount: 1, currentPage: 0 };

export const allArticlesPaginationSelector = createSelector<RootState, PaginationState, Pagination>(
  state => state.paginationState,
  state => state.articles.all ?? initialPagination,
);

export const blogArticlesPaginationSelector = createSelector<RootState, string, PaginationState, string, Pagination>(
  state => state.paginationState,
  (state, blogId) => blogId,
  (state, blogId) => state.articles.byBlog[blogId] ?? initialPagination,
);

export const categoryArticlesPaginationSelector = createSelector<
  RootState,
  string,
  PaginationState,
  string,
  Pagination
>(
  state => state.paginationState,
  (state, blogId) => blogId,
  (state, blogId) => state.articles.byCategory[blogId] ?? initialPagination,
);
