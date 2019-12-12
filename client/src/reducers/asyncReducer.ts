import { RootAction } from '../actions/rootTypes';
import { HttpError } from '../models/HttpError';

export interface AsyncState {
  [key: string]: {
    loading: boolean;
    error?: HttpError;
  };
}

const asyncActionErrorSuffix = '_ERROR';
const asyncActionSuccessSuffix = '_SUCCESS';

export function asyncReducer(state: AsyncState = {}, action: RootAction): AsyncState {
  if (action.type.endsWith(asyncActionErrorSuffix)) {
    return {
      ...state,
      [action.type.replace(asyncActionErrorSuffix, '')]: {
        loading: false,
        error: 'error' in action ? action.error : new HttpError(),
      },
    };
  }

  if (action.type.endsWith(asyncActionSuccessSuffix)) {
    return {
      ...state,
      [action.type.replace(asyncActionSuccessSuffix, '')]: {
        loading: false,
        error: undefined,
      },
    };
  }

  // todo: handle only async actions
  return {
    ...state,
    [action.type]: {
      loading: true,
      error: undefined,
    },
  };
}
