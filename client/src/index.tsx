import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { register } from 'register-service-worker';
import App from './App';
import { configureStore } from './store/configureStore';
import './styles/bootstrap.scss';
import './styles/font-awesome.scss';

register('/service-worker.js');

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
