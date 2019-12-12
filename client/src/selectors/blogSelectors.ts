import { createSelector } from 'reselect';
import { Blog } from '../models/Blog';
import { RootState } from '../reducers';
import { BlogState } from '../reducers/blogReducer';
import { EntityState } from '../reducers/entityReducer';

export const blogsSelector = createSelector<RootState, EntityState, Blog[]>(
  state => state.entityState,
  state => Object.values(state.blogs),
);

export const blogsLoadedSelector = createSelector<RootState, BlogState, boolean>(
  state => state.blogState,
  state => state.allLoaded,
);
