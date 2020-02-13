import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { initEntitiesFromIndexedDb } from '../core/entity/entity.actions';
import { rootReducer } from './reducers';

export async function configureStore(): Promise<Store> {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

  try {
    await initEntitiesFromIndexedDb()(store.dispatch, store.getState, null);
  } catch {
    // ignore
  }

  return store;
}
