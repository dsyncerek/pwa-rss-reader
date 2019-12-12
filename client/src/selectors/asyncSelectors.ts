import { createSelector } from 'reselect';
import { RootActionTypes } from '../actions/rootTypes';
import { HttpError } from '../models/HttpError';
import { RootState } from '../reducers';
import { AsyncState } from '../reducers/asyncReducer';

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
      if (types.includes(type as RootActionTypes)) {
        if (state[type]?.error) {
          return state[type].error;
        }
      }
    }
  },
);
