import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { register } from 'register-service-worker';
import { App } from './App';
import { store } from './core/store';
import './styles/bootstrap.scss';
import './styles/font-awesome.scss';

if (process.env.NODE_ENV !== 'development') {
  register('/service-worker.js');
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
