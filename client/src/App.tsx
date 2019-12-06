import React, { FC } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from './store/initialState';

const store = configureStore(initialState);

const App: FC = () => {
  return (
    <Provider store={store}>
      <div>Hello!</div>
    </Provider>
  );
};

export default App;
