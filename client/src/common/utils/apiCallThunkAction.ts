import { normalize, Schema } from 'normalizr';
import { RootState } from '../../store/reducers';
import { RootThunkAction, RootThunkDispatch } from '../../store/rootTypes';
import { EntitiesType } from '../../core/entity/types';
import { HttpError } from '../models/HttpError';

export interface ApiCallThunkActionParams<T = any> {
  callApi: () => Promise<T>;
  shouldCallApi?: (state: RootState) => boolean;
  schema?: Schema;

  onInit?: () => (dispatch: RootThunkDispatch) => void;
  onSuccess?: (entities: EntitiesType, response: T) => (dispatch: RootThunkDispatch) => void;
  onError?: (error: HttpError) => (dispatch: RootThunkDispatch) => void;
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

    onInit && onInit()(dispatch);

    try {
      const response = await callApi();

      if (schema) {
        const { entities } = normalize(response, schema);
        onSuccess && onSuccess(entities, response)(dispatch);
      } else {
        onSuccess && onSuccess({}, response)(dispatch);
      }
    } catch (error) {
      onError && onError(error)(dispatch);
    }
  };
}
