import { applyMiddleware, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { callApiMiddleware } from '../middlewares/callApiMiddleware';
import { rootReducer } from '../reducers';

export function configureStore(): Store {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, callApiMiddleware())));
}
