import { createSelector } from 'reselect';
import { RootState } from '../../store/reducers';

export const allArticlesLoadedPagesSelector = createSelector<RootState, number[] | undefined, number[]>(
  state => state.paginationState.articles.all?.loadedPages,
  loadedPages => loadedPages || [],
);

export const allArticlesPageCountSelector = createSelector<RootState, number | undefined, number>(
  state => state.paginationState.articles.all?.pageCount,
  pageCount => pageCount || Number.MAX_SAFE_INTEGER,
);

export const blogArticlesLoadedPagesSelector = createSelector<RootState, string, number[], number[]>(
  (state, blogId) => state.paginationState.articles.byBlog[blogId]?.loadedPages,
  loadedPages => loadedPages || [],
);

export const blogArticlesPageCountSelector = createSelector<RootState, string, number | undefined, number>(
  (state, blogId) => state.paginationState.articles.byBlog[blogId]?.pageCount,
  pageCount => pageCount || Number.MAX_SAFE_INTEGER,
);

export const categoryArticlesLoadedPagesSelector = createSelector<RootState, string, number[], number[]>(
  (state, categoryId) => state.paginationState.articles.byCategory[categoryId]?.loadedPages,
  loadedPages => loadedPages || [],
);

export const categoryArticlesPageCountSelector = createSelector<RootState, string, number | undefined, number>(
  (state, categoryId) => state.paginationState.articles.byCategory[categoryId]?.pageCount,
  pageCount => pageCount || Number.MAX_SAFE_INTEGER,
);
