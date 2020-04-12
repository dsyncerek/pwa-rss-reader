import { createSelector } from '@reduxjs/toolkit';
import { denormalize } from 'normalizr';
import { AppState } from '../../core/store';
import { selectCategoryEntities } from '../category/category.selectors';
import { blogAdapter } from './blog.reducer';
import { Blog, blogSchema } from './models/Blog';

export const { selectIds: selectBlogIds, selectEntities: selectBlogEntities } = blogAdapter.getSelectors<AppState>(
  state => state.blog,
);

export const selectAllBlogs = createSelector(
  selectBlogIds,
  selectBlogEntities,
  selectCategoryEntities,
  (ids, blogs, categories): Blog[] => {
    return denormalize(ids, [blogSchema], { blogs, categories });
  },
);
