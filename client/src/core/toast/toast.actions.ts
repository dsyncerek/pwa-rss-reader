import { createAction } from '@reduxjs/toolkit';
import { generateRandomId } from '../../common/utils/generateRandomId';
import { AppThunk } from '../store';
import { Toast } from './models/Toast';

export const showToast = createAction<{ toast: Toast }>(`toast/showToast`);
export const hideToast = createAction<{ id: string }>(`toast/hideToast`);

export const showAppToast = (toast: Omit<Toast, 'id'>): AppThunk => dispatch => {
  const toastWithId = { ...toast, id: generateRandomId() };
  dispatch(showToast({ toast: toastWithId }));

  if (toastWithId.autoHide) {
    setTimeout(() => dispatch(hideToast({ id: toastWithId.id })), 5000);
  }
};

export function showSuccessToast(content: string): AppThunk {
  return showAppToast({ title: 'Success', autoHide: true, content });
}

export function showErrorToast(content: string): AppThunk {
  return showAppToast({ title: 'Error', content });
}
