import { createAsyncCallThunk } from '../../common/utils/createAsyncCallThunk';
import { showErrorToast, showSuccessToast } from '../../core/toast/toast.actions';
import * as blogApi from './blog.api';
import * as blogIdb from './blog.idb';
import { Blog, blogSchema, SaveBlog } from './models/Blog';

export const initBlogsFromIdb = createAsyncCallThunk<Blog[]>(`blog/initBlogsFromIdb`, () => ({
  call: () => blogIdb.fetchAllBlogs(),
  schema: [blogSchema],
}));

export const fetchAllBlogs = createAsyncCallThunk<Blog[]>(`blog/fetchAllBlogs`, () => ({
  call: () => blogApi.fetchAllBlogs(),
  shouldCall: state => !state.blog.allLoaded,
  schema: [blogSchema],
  onSuccess: blogs => blogIdb.saveAllBlogs(blogs).catch(),
}));

export const createBlog = createAsyncCallThunk<Blog, { blog: SaveBlog }>(
  `blog/createBlog`,
  ({ blog }, { dispatch }) => ({
    call: () => blogApi.createBlog(blog),
    schema: blogSchema,
    onSuccess: blog => {
      dispatch(showSuccessToast('Blog has been created.'));
      blogIdb.saveBlog(blog).catch();
    },
  }),
);

export const updateBlog = createAsyncCallThunk<Blog, { blog: SaveBlog }>(
  `blog/updateBlog`,
  ({ blog }, { dispatch }) => ({
    call: () => blogApi.updateBlog(blog),
    schema: blogSchema,
    onSuccess: blog => {
      dispatch(showSuccessToast('Blog has been updated.'));
      blogIdb.saveBlog(blog).catch();
    },
  }),
);

export const deleteBlog = createAsyncCallThunk<void, { id: string }>(`blog/deleteBlog`, ({ id }, { dispatch }) => ({
  call: () => blogApi.deleteBlog(id),
  onError: error => dispatch(showErrorToast(error.message)),
  onSuccess: () => {
    dispatch(showSuccessToast('Blog has been deleted.'));
    blogIdb.deleteBlog(id).catch();
  },
}));
