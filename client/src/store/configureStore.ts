import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { initEntitiesFromIndexedDb } from '../actions/entityActions';
import { rootReducer } from '../reducers';

const logger = createLogger({ collapsed: true });

export async function configureStore(): Promise<Store> {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
  await initEntitiesFromIndexedDb()(store.dispatch, store.getState, null);
  return store;
}
