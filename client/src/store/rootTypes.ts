import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ArticleAction, ArticleActionTypes } from '../modules/article/article.action-types';
import { BlogAction, BlogActionTypes } from '../modules/blog/blog.action-types';
import { CategoryAction, CategoryActionTypes } from '../modules/category/category.action-types';
import { EntityAction, EntityActionTypes } from '../core/entity/entity.action-types';
import { ToastAction, ToastActionTypes } from '../core/toast/toast.action-types';
import { RootState } from './reducers';

export type RootThunkDispatch<ReturnType = void> = ThunkDispatch<RootState, null, RootAction>;
export type RootThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, null, RootAction>;

export type RootAction = EntityAction | ArticleAction | BlogAction | CategoryAction | ToastAction;

export type RootActionTypes =
  | EntityActionTypes
  | ArticleActionTypes
  | BlogActionTypes
  | CategoryActionTypes
  | ToastActionTypes;
