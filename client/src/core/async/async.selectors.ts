import { createSelector } from 'reselect';
import { RootState } from '../../store/reducers';
import { RootActionTypes } from '../../store/rootTypes';
import { HttpError } from '../../common/models/HttpError';
import { AsyncState } from './async.reducer';

export const loadingSelector = createSelector<RootState, RootActionTypes[], AsyncState, RootActionTypes[], boolean>(
  state => state.asyncState,
  (state: RootState, types: RootActionTypes[]) => types,
  (state, types) => types.some(type => state[type]?.loading),
);

export const errorSelector = createSelector<
  RootState,
  RootActionTypes[],
  AsyncState,
  RootActionTypes[],
  HttpError | undefined
>(
  state => state.asyncState,
  (state: RootState, types: RootActionTypes[]) => types,
  (state, types) => {
    for (const type in state) {
      if (state.hasOwnProperty(type)) {
        if (types.includes(type as RootActionTypes)) {
          if (state[type]?.error) {
            return state[type].error;
          }
        }
      }
    }
  },
);
