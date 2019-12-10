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

        const { shouldCallApi, callApi, schema, initAction, successAction, errorAction }: AsyncAction = action;

        if (shouldCallApi && !shouldCallApi(getState())) {
          return;
        }

        dispatch(initAction());

        try {
          const response = await callApi();

          if (schema) {
            const { entities } = normalize(response, schema);
            dispatch(successAction(entities, response));
          } else {
            dispatch(successAction({}, response));
          }
        } catch (error) {
          dispatch(errorAction(error));
        }
      };
    };
  };
}
