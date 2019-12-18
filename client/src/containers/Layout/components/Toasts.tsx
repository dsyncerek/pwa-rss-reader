import React, { FC } from 'react';
import Toast from 'react-bootstrap/Toast';
import { Toast as ToastModel } from '../../../models/Toast';

type NotificationsProps = {
  toasts?: ToastModel[];
  onClose: (id: string) => void;
};

const Toasts: FC<NotificationsProps> = ({ toasts = [], onClose }) => {
  return (
    <div aria-live="polite" aria-atomic="true" className="position-fixed" style={{ right: 20, top: 20 }}>
      {toasts.map(toast => (
        <Toast style={{ width: 200 }} onClose={() => onClose(toast.id)} key={toast.id}>
          <Toast.Header>
            <strong className="mr-auto">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body>{toast.content}</Toast.Body>
        </Toast>
      ))}
    </div>
  );
};

export default Toasts;
