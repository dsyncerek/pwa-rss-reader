import { ArticleAction } from './articleActionTypes';

export interface ArticleState {}

export const initialState: ArticleState = {};

export function articleReducer(state: ArticleState = initialState, action: ArticleAction): ArticleState {
  return state;
}
