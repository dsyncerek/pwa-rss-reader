import { createSelector } from 'reselect';
import { Article } from '../models/Article';
import { HttpError } from '../models/HttpError';
import { RootState } from '../reducers';
import { ArticleState } from '../reducers/articleReducer';
import { EntityState } from '../reducers/entityReducer';

const entityStateSelector = (state: RootState) => state.entityState;
const articleStateSelector = (state: RootState) => state.articleState;

export const articlesSelector = createSelector<RootState, EntityState, Article[]>(entityStateSelector, state =>
  Object.values(state.articles),
);

export const articleSelector = (id: string) =>
  createSelector<RootState, EntityState, Article>(entityStateSelector, state => state.articles[id]);

export const articleLoadingSelector = createSelector<RootState, ArticleState, boolean>(
  articleStateSelector,
  state => state.loading,
);

export const articleErrorSelector = createSelector<RootState, ArticleState, HttpError | undefined>(
  articleStateSelector,
  state => state.error,
);
