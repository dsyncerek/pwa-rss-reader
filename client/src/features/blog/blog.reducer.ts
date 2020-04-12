import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { createBlog, deleteBlog, fetchAllBlogs, initBlogsFromIdb, updateBlog } from './blog.actions';
import { Blog, blogSortComparer } from './models/Blog';

export const blogFeatureKey = 'blog';
export const blogAdapter = createEntityAdapter<Blog>({ sortComparer: blogSortComparer });

export interface BlogState extends EntityState<Blog> {
  allLoaded: boolean;
}

export const initialState: BlogState = blogAdapter.getInitialState({
  allLoaded: false,
});

export const blogReducer = createReducer(initialState, builder => {
  builder.addCase(initBlogsFromIdb.fulfilled, (state, { payload }) => {
    blogAdapter.upsertMany(state, payload.entities?.blogs || {});
  });
  builder.addCase(fetchAllBlogs.fulfilled, (state, { payload }) => {
    blogAdapter.upsertMany(state, payload.entities?.blogs || {});
    state.allLoaded = true;
  });
  builder.addCase(createBlog.fulfilled, (state, { payload }) => {
    blogAdapter.upsertMany(state, payload.entities?.blogs || {});
  });
  builder.addCase(updateBlog.fulfilled, (state, { payload }) => {
    blogAdapter.upsertMany(state, payload.entities?.blogs || {});
  });
  builder.addCase(deleteBlog.fulfilled, (state, { meta: { arg } }) => {
    blogAdapter.removeOne(state, arg.id);
  });
});
