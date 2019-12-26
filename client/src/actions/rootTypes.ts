import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Article } from '../models/Article';
import { Blog } from '../models/Blog';
import { Category } from '../models/Category';
import { Dictionary } from '../models/Dictionary';
import { RootState } from '../reducers';
import { ArticleAction, ArticleActionTypes } from './articleActionTypes';
import { BlogAction, BlogActionTypes } from './blogActionTypes';
import { CategoryAction, CategoryActionTypes } from './categoryActionTypes';
import { EntityAction, EntityActionTypes } from './entityActionTypes';
import { ToastAction, ToastActionTypes } from './toastActionTypes';

export type RootThunkDispatch<ReturnType = void> = ThunkDispatch<RootState, null, RootAction>;
export type RootThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, null, RootAction>;

export type RootEntitiesType = {
  articles?: Dictionary<Article>;
  blogs?: Dictionary<Blog>;
  categories?: Dictionary<Category>;
};

export type RootAction = EntityAction | ArticleAction | BlogAction | CategoryAction | ToastAction;

export type RootActionTypes =
  | EntityActionTypes
  | ArticleActionTypes
  | BlogActionTypes
  | CategoryActionTypes
  | ToastActionTypes;
