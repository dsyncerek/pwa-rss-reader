import React, { FC } from 'react';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../toast.actions';

export const Toasts: FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector(state => state.toast.toasts);

  return (
    <div aria-live="polite" aria-atomic="true" className="position-fixed" style={{ right: 20, top: 20 }}>
      {toasts.map(toast => (
        <Toast style={{ width: 200 }} onClose={() => dispatch(hideToast({ id: toast.id }))} key={toast.id}>
          <Toast.Header>
            <strong className="mr-auto">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body>{toast.content}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
};
