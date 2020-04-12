import { AnyAction } from '@reduxjs/toolkit';
import produce from 'immer';
import { HttpError } from '../../common/models/HttpError';
import { AsyncStatus } from './models/AsyncStatus';

export const asyncFeatureKey = 'async';

export interface AsyncState {
  [key: string]: AsyncStatus;
}

export const initialState: AsyncState = {};

const asyncActionPendingSuffix = '/pending';
const asyncActionFulfilledSuffix = '/fulfilled';
const asyncActionRejectedSuffix = '/rejected';

export function asyncReducer(state: AsyncState = initialState, action: AnyAction): AsyncState {
  if (action.type.endsWith(asyncActionPendingSuffix)) {
    return produce(state, draft => {
      draft[action.type] = {
        loading: true,
        error: undefined,
      };
    });
  }

  if (action.type.endsWith(asyncActionFulfilledSuffix)) {
    return produce(state, draft => {
      delete draft[action.type.replace(asyncActionFulfilledSuffix, asyncActionPendingSuffix)];
    });
  }

  if (action.type.endsWith(asyncActionRejectedSuffix)) {
    return produce(state, draft => {
      draft[action.type.replace(asyncActionRejectedSuffix, asyncActionPendingSuffix)] = {
        loading: false,
        error: action.payload || new HttpError(),
      };
    });
  }

  return state;
}
