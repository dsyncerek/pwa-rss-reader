import { createReducer } from '@reduxjs/toolkit';
import { Toast } from './models/Toast';
import { hideToast, showToast } from './toast.actions';

export const toastFeatureKey = 'toast';

export interface ToastState {
  toasts: Toast[];
}

export const initialState: ToastState = {
  toasts: [],
};

export const toastReducer = createReducer(initialState, builder => {
  builder.addCase(showToast, (state, { payload }) => {
    state.toasts.push(payload.toast);
  });
  builder.addCase(hideToast, (state, { payload }) => {
    state.toasts = state.toasts.filter(toast => toast.id !== payload.id);
  });
});
