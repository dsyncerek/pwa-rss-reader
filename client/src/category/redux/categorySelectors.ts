import { createSelector } from 'reselect';
import { Dictionary } from '../../common/models/Dictionary';
import { RootState } from '../../store/reducers';
import { Category } from '../models/Category';

export const categoriesSelector = createSelector<RootState, Dictionary<Category>, Category[]>(
  state => state.entityState.categories,
  categories => Object.values(categories),
);

export const allCategoriesLoadedSelector = createSelector<RootState, boolean, boolean>(
  state => state.categoryState.allLoaded,
  allLoaded => allLoaded,
);
