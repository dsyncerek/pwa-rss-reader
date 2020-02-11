import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { EntityState } from '../../common/entity/entityReducer';
import { entityStateSelector } from '../../common/entity/entitySelectors';
import { RootState } from '../../store/reducers';
import { Category, categorySchema } from '../models/Category';

export const categoriesSelector = createSelector<RootState, EntityState, Category[]>(entityStateSelector, entities =>
  denormalize(Object.keys(entities.categories), [categorySchema], entities),
);

export const allCategoriesLoadedSelector = createSelector<RootState, boolean, boolean>(
  state => state.categoryState.allLoaded,
  allLoaded => allLoaded,
);
