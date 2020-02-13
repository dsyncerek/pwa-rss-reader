import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { EntityState } from '../core/entity/entity.reducer';
import { entityStateSelector } from '../core/entity/entity.selectors';
import { RootState } from '../store/reducers';
import { Category, categorySchema } from './models/Category';

export const categoriesSelector = createSelector<RootState, EntityState, Category[]>(entityStateSelector, entities =>
  denormalize(Object.keys(entities.categories), [categorySchema], entities),
);

export const allCategoriesLoadedSelector = createSelector<RootState, boolean, boolean>(
  state => state.categoryState.allLoaded,
  allLoaded => allLoaded,
);
