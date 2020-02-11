import { RootAction, RootThunkAction } from '../../store/rootTypes';
import { Toast } from './Toast';
import { ToastActionTypes } from './toastActionTypes';

function generateRandomId(): string {
  return Math.random()
    .toString(16)
    .substring(2);
}

export function hideToast(id: string): RootAction {
  return { type: ToastActionTypes.HIDE_TOAST, id };
}

export function showSuccessToast(content: string): RootThunkAction {
  return showToast({ title: 'Success', autoHide: true, content });
}

export function showErrorToast(content: string): RootThunkAction {
  return showToast({ title: 'Error', content });
}

export function showToast(toast: Omit<Toast, 'id'>): RootThunkAction<Promise<boolean>> {
  const toastWithId = { ...toast, id: generateRandomId() };

  return dispatch => {
    dispatch({ type: ToastActionTypes.SHOW_TOAST, toast: toastWithId });

    if (toastWithId.autoHide) {
      setTimeout(() => dispatch(hideToast(toastWithId.id)), 5000);
    }

    return new Promise(resolve => resolve(false));
  };
}
