import { createSelector } from 'reselect';
import { Category } from '../models/Category';
import { RootState } from '../reducers';
import { CategoryState } from '../reducers/categoryReducer';
import { EntityState } from '../reducers/entityReducer';

const entityStateSelector = (state: RootState) => state.entityState;
const categoryStateSelector = (state: RootState) => state.categoryState;

export const categoriesSelector = createSelector<RootState, EntityState, Category[]>(entityStateSelector, state =>
  Object.values(state.categories),
);

export const categoriesLoadedSelector = createSelector<RootState, CategoryState, boolean>(
  categoryStateSelector,
  state => state.allLoaded,
);
