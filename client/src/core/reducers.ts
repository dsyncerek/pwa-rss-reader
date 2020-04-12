import { combineReducers } from 'redux';
import { asyncFeatureKey, asyncReducer } from './async/async.reducer';
import { paginationFeatureKey, paginationReducer } from './pagination/pagination.reducer';
import { toastFeatureKey, toastReducer } from './toast/toast.reducer';
import { articleFeatureKey, articleReducer } from '../features/article/article.reducer';
import { blogFeatureKey, blogReducer } from '../features/blog/blog.reducer';
import { categoryFeatureKey, categoryReducer } from '../features/category/category.reducer';

export const appReducer = combineReducers({
  [asyncFeatureKey]: asyncReducer,
  [paginationFeatureKey]: paginationReducer,
  [toastFeatureKey]: toastReducer,
  [articleFeatureKey]: articleReducer,
  [blogFeatureKey]: blogReducer,
  [categoryFeatureKey]: categoryReducer,
});
