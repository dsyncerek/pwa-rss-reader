import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { EntityState } from '../core/entity/entity.reducer';
import { entityStateSelector } from '../core/entity/entity.selectors';
import { RootState } from '../store/reducers';
import { Blog, blogSchema } from './models/Blog';

export const blogsSelector = createSelector<RootState, EntityState, Blog[]>(entityStateSelector, entities =>
  denormalize(Object.keys(entities.blogs), [blogSchema], entities),
);

export const allBlogsLoadedSelector = createSelector<RootState, boolean, boolean>(
  state => state.blogState.allLoaded,
  allLoaded => allLoaded,
);
