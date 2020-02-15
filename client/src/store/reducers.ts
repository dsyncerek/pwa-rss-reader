import { combineReducers } from 'redux';
import { articleReducer } from '../modules/article/article.reducer';
import { blogReducer } from '../modules/blog/blog.reducer';
import { categoryReducer } from '../modules/category/category.reducer';
import { asyncReducer } from '../core/async/async.reducer';
import { entityReducer } from '../core/entity/entity.reducer';
import { paginationReducer } from '../core/pagination/pagination.reducer';
import { toastReducer } from '../core/toast/toast.reducer';

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
