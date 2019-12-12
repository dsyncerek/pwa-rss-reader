import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

export function configureStore(): Store {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
