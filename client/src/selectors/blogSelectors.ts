import { createSelector } from 'reselect';
import { Blog } from '../models/Blog';
import { RootState } from '../reducers';
import { BlogState } from '../reducers/blogReducer';
import { EntityState } from '../reducers/entityReducer';

const entityStateSelector = (state: RootState) => state.entityState;
const blogStateSelector = (state: RootState) => state.blogState;

export const blogsSelector = createSelector<RootState, EntityState, Blog[]>(entityStateSelector, state =>
  Object.values(state.blogs),
);

export const blogsLoadedSelector = createSelector<RootState, BlogState, boolean>(
  blogStateSelector,
  state => state.allLoaded,
);
