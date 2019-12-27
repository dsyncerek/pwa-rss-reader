import { createSelector } from 'reselect';
import { RootState } from '../reducers';

export const allArticlesLoadedPagesSelector = createSelector<RootState, number[] | undefined, number[]>(
  state => state.paginationState.articles.all?.loadedPages,
  loadedPages => loadedPages || [],
);

export const blogArticlesLoadedPagesSelector = createSelector<RootState, string, number[], number[]>(
  (state, blogId) => state.paginationState.articles.byBlog[blogId]?.loadedPages,
  loadedPages => loadedPages || [],
);

export const categoryArticlesLoadedPagesSelector = createSelector<RootState, string, number[], number[]>(
  (state, categoryId) => state.paginationState.articles.byCategory[categoryId]?.loadedPages,
  loadedPages => loadedPages || [],
);
