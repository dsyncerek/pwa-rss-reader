import { combineReducers } from 'redux';
import { articleReducer } from '../article/redux/articleReducer';
import { blogReducer } from '../blog/redux/blogReducer';
import { categoryReducer } from '../category/redux/categoryReducer';
import { asyncReducer } from '../common/async/asyncReducer';
import { entityReducer } from '../common/entity/entityReducer';
import { paginationReducer } from '../common/pagination/paginationReducer';
import { toastReducer } from '../common/toast/toastReducer';

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
