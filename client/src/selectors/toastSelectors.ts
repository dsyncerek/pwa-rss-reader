import { createSelector } from 'reselect';
import { Toast } from '../models/Toast';
import { RootState } from '../reducers';
import { ToastState } from '../reducers/toastReducer';

export const toastsSelector = createSelector<RootState, ToastState, Toast[]>(
  state => state.toastState,
  state => state.toasts,
);
