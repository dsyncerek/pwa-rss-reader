import { Schema } from 'normalizr';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Dictionary } from '../models/Dictionary';
import { HttpError } from '../models/HttpError';
import { RootState } from '../reducers';
import { ArticleAction, ArticleActionTypes } from './articleActionTypes';
import { BlogAction, BlogActionTypes } from './blogActionTypes';
import { CategoryAction, CategoryActionTypes } from './categoryActionTypes';
import { ToastAction, ToastActionTypes } from './toastActionTypes';

export type RootThunkDispatch<ReturnType = void> = ThunkDispatch<RootState, null, RootAction>;
export type RootThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, null, RootAction>;

export interface ApiCallThunkActionParams<T = any> {
  callApi: () => Promise<T>;
  shouldCallApi?: (state: RootState) => boolean;
  schema?: Schema;

  onInit: () => (dispatch: RootThunkDispatch) => void;
  onSuccess: (entities: Dictionary<Dictionary>, response: T) => (dispatch: RootThunkDispatch) => void;
  onError: (error: HttpError) => (dispatch: RootThunkDispatch) => void;
}

export type RootAction = ArticleAction | BlogAction | CategoryAction | ToastAction;
export type RootActionTypes = ArticleActionTypes | BlogActionTypes | CategoryActionTypes | ToastActionTypes;
