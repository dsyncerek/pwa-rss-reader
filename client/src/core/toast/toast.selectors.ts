import { createSelector } from 'reselect';
import { RootState } from '../../store/reducers';
import { Toast } from './models/Toast';

export const toastsSelector = createSelector<RootState, Toast[], Toast[]>(
  state => state.toastState.toasts,
  toasts => toasts,
);
