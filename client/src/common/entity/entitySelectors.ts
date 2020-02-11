import { createSelector } from 'reselect';
import { RootState } from '../../store/reducers';
import { EntityState } from './entityReducer';

export const entityStateSelector = createSelector<RootState, EntityState, EntityState>(
  state => state.entityState,
  entities => entities,
);
