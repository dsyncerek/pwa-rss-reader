import { createSelector } from 'reselect';
import { Toast } from '../models/Toast';
import { RootState } from '../reducers';
import { ToastState } from '../reducers/toastReducer';

const toastStateSelector = (state: RootState) => state.toastState;

export const toastsSelector = createSelector<RootState, ToastState, Toast[]>(toastStateSelector, state => state.toasts);
