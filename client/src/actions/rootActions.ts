import { normalize } from 'normalizr';
import { ApiCallThunkActionParams, RootThunkAction } from './rootTypes';

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
