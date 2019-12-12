import { Toast } from '../models/Toast';

export enum ToastActionTypes {
  SHOW_TOAST = 'SHOW_TOAST',
  HIDE_TOAST = 'HIDE_TOAST',
}

export interface ShowToastAction {
  type: ToastActionTypes.SHOW_TOAST;
  toast: Toast;
}

export interface HideToastAction {
  type: ToastActionTypes.HIDE_TOAST;
  id: string;
}

export type ToastAction = ShowToastAction | HideToastAction;
