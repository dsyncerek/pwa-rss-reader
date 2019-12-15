import { combineReducers } from 'redux';
import { articleReducer } from './articleReducer';
import { asyncReducer } from './asyncReducer';
import { blogReducer } from './blogReducer';
import { categoryReducer } from './categoryReducer';
import { entityReducer } from './entityReducer';
import { paginationReducer } from './paginationReducer';
import { toastReducer } from './toastReducer';

export const rootReducer = combineReducers({
  articleState: articleReducer,
  blogState: blogReducer,
  categoryState: categoryReducer,
  toastState: toastReducer,
  entityState: entityReducer,
  asyncState: asyncReducer,
  paginationState: paginationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
