import { createSelector } from 'reselect';
import { Category } from '../models/Category';
import { RootState } from '../reducers';
import { CategoryState } from '../reducers/categoryReducer';
import { EntityState } from '../reducers/entityReducer';

export const categoriesSelector = createSelector<RootState, EntityState, Category[]>(
  state => state.entityState,
  state => Object.values(state.categories),
);

export const categoriesLoadedSelector = createSelector<RootState, CategoryState, boolean>(
  state => state.categoryState,
  state => state.allLoaded,
);
