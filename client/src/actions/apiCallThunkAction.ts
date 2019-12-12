import { normalize, Schema } from 'normalizr';
import { HttpError } from '../models/HttpError';
import { RootState } from '../reducers';
import { RootEntitiesType, RootThunkAction, RootThunkDispatch } from './rootTypes';

export interface ApiCallThunkActionParams<T = any> {
  callApi: () => Promise<T>;
  shouldCallApi?: (state: RootState) => boolean;
  schema?: Schema;

  onInit: () => (dispatch: RootThunkDispatch) => void;
  onSuccess: (entities: RootEntitiesType, response: T) => (dispatch: RootThunkDispatch) => void;
  onError: (error: HttpError) => (dispatch: RootThunkDispatch) => void;
}

export function apiCallThunkAction<T>({
  shouldCallApi,
  callApi,
  schema,
  onInit,
  onSuccess,
  onError,
}: ApiCallThunkActionParams<T>): RootThunkAction {
  return async (dispatch, getState) => {
    if (shouldCallApi && !shouldCallApi(getState())) {
      return;
    }

    onInit()(dispatch);

    try {
      const response = await callApi();

      if (schema) {
        const { entities } = normalize(response, schema);
        onSuccess(entities, response)(dispatch);
      } else {
        onSuccess({}, response)(dispatch);
      }
    } catch (error) {
      onError(error)(dispatch);
    }
  };
}
