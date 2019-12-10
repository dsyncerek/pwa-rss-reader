import { Schema } from 'normalizr';
import { AnyAction } from 'redux';
import { Dictionary } from '../models/Dictionary';
import { HttpError } from '../models/HttpError';
import { RootState } from '../reducers';

export interface AsyncAction<A = AnyAction, T = any> {
  callApi: () => Promise<T>;
  shouldCallApi?: (state: RootState) => boolean;
  schema?: Schema;

  initAction: () => A;
  successAction: (entities: Dictionary<Dictionary>, response: T) => A;
  errorAction: (error: HttpError) => A;
}
