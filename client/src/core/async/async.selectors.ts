import { createSelector } from 'reselect';
import { HttpError } from '../../common/models/HttpError';
import { RootState } from '../../store/reducers';
import { RootActionTypes } from '../../store/rootTypes';
import { AsyncStateSlice } from './async.reducer';

export const loadingSelector = createSelector<RootState, RootActionTypes[], AsyncStateSlice[], boolean>(
  (state, types) => types.map(type => state.asyncState[type]).filter(Boolean),
  actions => actions.some(action => action.loading),
);

export const errorSelector = createSelector<RootState, RootActionTypes[], AsyncStateSlice[], HttpError | undefined>(
  (state, types) => types.map(type => state.asyncState[type]).filter(Boolean),
  actions => actions.map(action => action.error).find(Boolean),
);
