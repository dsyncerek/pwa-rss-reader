import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalize, Schema } from 'normalizr';
import { AppAsyncThunkConfig, AppDispatch, AppState } from '../../core/store';
import { Entities } from '../models/Entities';
import { HttpError } from '../models/HttpError';

export interface AsyncThunkCallOptions<T = any> {
  call: () => Promise<T>;
  shouldCall?: (state: AppState) => boolean;
  schema?: Schema;
  onInit?: () => void;
  onSuccess?: (response: T, entities: Entities) => void;
  onError?: (error: HttpError) => void;
}

export interface AsyncThunkCallResponse<T = void> {
  entities?: Entities;
  response: T;
}

type AsyncThunkCallCreator<Params, Returned> = (
  params: Params,
  thunkAPI: { getState: () => AppState; dispatch: AppDispatch },
) => AsyncThunkCallOptions<Returned>;

export function createAsyncCallThunk<Returned, Params = void>(
  type: string,
  optionsCreator: AsyncThunkCallCreator<Params, Returned>,
) {
  return createAsyncThunk<AsyncThunkCallResponse<Returned>, Params, AppAsyncThunkConfig>(
    type,
    async (params, thunkAPI) => {
      const { call, schema, onInit, onSuccess, onError } = optionsCreator(params, thunkAPI);

      onInit && onInit();

      try {
        const response = await call();

        if (schema) {
          const { entities } = normalize(response, schema);
          onSuccess && onSuccess(response, entities);
          return { entities, response };
        } else {
          onSuccess && onSuccess(response, {});
          return { response };
        }
      } catch (error) {
        onError && onError(error);
        return thunkAPI.rejectWithValue({ ...error });
      }
    },
    {
      condition(params: Params, { getState }): boolean {
        const { shouldCall } = optionsCreator(params, { getState, dispatch: null! });
        return !(shouldCall && !shouldCall(getState()));
      },
    },
  );
}
