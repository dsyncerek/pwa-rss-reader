import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { AppState } from './initialState';

function configureStore(initialState: AppState): Store {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;
