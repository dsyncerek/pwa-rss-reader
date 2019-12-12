import { createSelector } from 'reselect';
import { Article } from '../models/Article';
import { RootState } from '../reducers';
import { EntityState } from '../reducers/entityReducer';

export const articlesSelector = createSelector<RootState, EntityState, Article[]>(
  state => state.entityState,
  state => Object.values(state.articles),
);

export const articleSelector = createSelector<RootState, string, EntityState, string, Article | undefined>(
  state => state.entityState,
  (state, id) => id,
  (state, id) => state.articles[id],
);
