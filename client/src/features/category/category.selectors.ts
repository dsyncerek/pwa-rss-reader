import { AppState } from '../../core/store';
import { categoryAdapter } from './category.reducer';

export const { selectAll: selectAllCategories, selectEntities: selectCategoryEntities } = categoryAdapter.getSelectors<
  AppState
>(state => state.category);
