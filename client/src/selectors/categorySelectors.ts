import { createSelector } from 'reselect';
import { Category } from '../models/Category';
import { Dictionary } from '../models/Dictionary';
import { RootState } from '../reducers';

export const categoriesSelector = createSelector<RootState, Dictionary<Category>, Category[]>(
  state => state.entityState.categories,
  categories => Object.values(categories),
);

export const allCategoriesLoadedSelector = createSelector<RootState, boolean, boolean>(
  state => state.categoryState.allLoaded,
  allLoaded => allLoaded,
);
