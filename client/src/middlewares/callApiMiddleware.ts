import { normalize } from 'normalizr';
import { Middleware } from 'redux';
import { AsyncAction } from '../actions/types';
import { RootState } from '../reducers';

export function callApiMiddleware(): Middleware<{}, RootState> {
  return function({ dispatch, getState }) {
    return function(next) {
      return async function(action) {
        if (!action.callApi) {
          return next(action);
        }

        const { shouldCallApi, callApi, schema, onInit, onSuccess, onError }: AsyncAction = action;

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
    };
  };
}
