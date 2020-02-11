import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ArticleAction, ArticleActionTypes } from '../article/redux/articleActionTypes';
import { BlogAction, BlogActionTypes } from '../blog/redux/blogActionTypes';
import { CategoryAction, CategoryActionTypes } from '../category/redux/categoryActionTypes';
import { EntityAction, EntityActionTypes } from '../common/entity/entityActionTypes';
import { ToastAction, ToastActionTypes } from '../common/toast/toastActionTypes';
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
