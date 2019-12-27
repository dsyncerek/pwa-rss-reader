import { createSelector } from 'reselect';
import { Toast } from '../models/Toast';
import { RootState } from '../reducers';

export const toastsSelector = createSelector<RootState, Toast[], Toast[]>(
  state => state.toastState.toasts,
  toasts => toasts,
);
