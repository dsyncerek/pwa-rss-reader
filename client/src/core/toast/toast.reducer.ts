import { Toast } from './models/Toast';
import { ToastAction, ToastActionTypes } from './toast.action-types';

export interface ToastState {
  toasts: Toast[];
}

export const initialState: ToastState = {
  toasts: [],
};

export function toastReducer(state: ToastState = initialState, action: ToastAction): ToastState {
  switch (action.type) {
    case ToastActionTypes.SHOW_TOAST:
      return { ...state, toasts: [...state.toasts, action.toast] };

    case ToastActionTypes.HIDE_TOAST:
      return { ...state, toasts: state.toasts.filter(toast => toast.id !== action.id) };

    default:
      return state;
  }
}
