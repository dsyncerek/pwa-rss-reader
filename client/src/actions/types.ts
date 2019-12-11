import { Schema } from 'normalizr';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Dictionary } from '../models/Dictionary';
import { HttpError } from '../models/HttpError';
import { RootState } from '../reducers';
import { ArticleActions } from './articleActionTypes';
import { BlogActions } from './blogActionTypes';
import { CategoryActions } from './categoryActionTypes';
import { ToastActions } from './toastActionTypes';

export type RootThunkDispatch<ReturnType = void> = ThunkDispatch<RootState, null, AllActions>;
export type RootThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, null, AllActions>;

export interface AsyncAction<T = any> {
  callApi: () => Promise<T>;
  shouldCallApi?: (state: RootState) => boolean;
  schema?: Schema;

  onInit: () => (dispatch: RootThunkDispatch) => void;
  onSuccess: (entities: Dictionary<Dictionary>, response: T) => (dispatch: RootThunkDispatch) => void;
  onError: (error: HttpError) => (dispatch: RootThunkDispatch) => void;
}

export type AllActions = ArticleActions | BlogActions | CategoryActions | ToastActions;
