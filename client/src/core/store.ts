import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { HttpError } from '../common/models/HttpError';
import { appReducer } from './reducers';

export const store = configureStore({ reducer: appReducer });

export type AppState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;
export type AppAsyncThunkConfig = { dispatch: AppDispatch; state: AppState; rejectValue: HttpError };

declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}
