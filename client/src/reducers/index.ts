import { combineReducers } from 'redux';
import { articleReducer } from './articleReducer';
import { blogReducer } from './blogReducer';
import { categoryReducer } from './categoryReducer';
import { entityReducer } from './entityReducer';

export const rootReducer = combineReducers({
  articleState: articleReducer,
  blogState: blogReducer,
  categoryState: categoryReducer,
  entityState: entityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
