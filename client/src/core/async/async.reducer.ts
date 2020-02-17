import produce from 'immer';
import { HttpError } from '../../common/models/HttpError';
import { RootAction } from '../../store/rootTypes';

export interface AsyncStateSlice {
  loading: boolean;
  error?: HttpError;
}

export interface AsyncState {
  [key: string]: AsyncStateSlice;
}

const asyncActionErrorSuffix = '_ERROR';
const asyncActionSuccessSuffix = '_SUCCESS';

export function asyncReducer(state: AsyncState = {}, action: RootAction): AsyncState {
  if (action.type.endsWith(asyncActionErrorSuffix)) {
    return produce(state, draft => {
      draft[action.type.replace(asyncActionErrorSuffix, '')] = {
        loading: false,
        error: 'error' in action ? action.error : new HttpError(),
      };
    });
  }

  if (action.type.endsWith(asyncActionSuccessSuffix)) {
    return produce(state, draft => {
      delete draft[action.type.replace(asyncActionSuccessSuffix, '')];
    });
  }

  return produce(state, draft => {
    draft[action.type] = {
      loading: true,
      error: undefined,
    };
  });
}