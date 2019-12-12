import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

const logger = createLogger({ collapsed: true });

export function configureStore(): Store {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
}
