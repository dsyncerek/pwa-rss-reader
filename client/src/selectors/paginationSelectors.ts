import { createSelector } from 'reselect';
import { Pagination } from '../models/Pagination';
import { RootState } from '../reducers';

export const initialPagination: Pagination = { totalItems: 0, pageCount: 1, currentPage: 0 };

export const allArticlesPaginationSelector = createSelector<RootState, Pagination | undefined, Pagination>(
  state => state.paginationState.articles.all,
  pagination => pagination ?? initialPagination,
);

export const blogArticlesPaginationSelector = createSelector<RootState, string, Pagination, Pagination>(
  (state, blogId) => state.paginationState.articles.byBlog[blogId],
  pagination => pagination ?? initialPagination,
);

export const categoryArticlesPaginationSelector = createSelector<RootState, string, Pagination, Pagination>(
  (state, categoryId) => state.paginationState.articles.byCategory[categoryId],
  pagination => pagination ?? initialPagination,
);
