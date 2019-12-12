import { createSelector } from 'reselect';
import { Article } from '../models/Article';
import { RootState } from '../reducers';
import { EntityState } from '../reducers/entityReducer';

const entityStateSelector = (state: RootState) => state.entityState;

export const articlesSelector = createSelector<RootState, EntityState, Article[]>(entityStateSelector, state =>
  Object.values(state.articles),
);

export const articleSelector = createSelector<RootState, string, EntityState, string, Article>(
  entityStateSelector,
  (state, id) => id,
  (state, id) => state.articles[id],
);
