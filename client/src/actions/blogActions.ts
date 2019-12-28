import * as blogApi from '../api/blogApi';
import * as blogIdb from '../api/blogIdb';
import { Blog, blogSchema, SaveBlog } from '../models/Blog';
import { allBlogsLoadedSelector } from '../selectors/blogSelectors';
import { apiCallThunkAction } from '../utils/apiCallThunkAction';
import { BlogActionTypes } from './blogActionTypes';
import { RootThunkAction } from './rootTypes';
import { showErrorToast, showSuccessToast } from './toastActions';

export function fetchAllBlogs(): RootThunkAction {
  return apiCallThunkAction<Blog[]>({
    callApi: async () => blogApi.fetchAllBlogs(),
    shouldCallApi: state => !allBlogsLoadedSelector(state),
    schema: [blogSchema],

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.FETCH_ALL_BLOGS });
    },
    onSuccess: (entities, blogs) => dispatch => {
      dispatch({ type: BlogActionTypes.FETCH_ALL_BLOGS_SUCCESS, entities });
      blogIdb.saveAllBlogs(blogs).catch();
    },
    onError: error => dispatch => {
      dispatch({ type: BlogActionTypes.FETCH_ALL_BLOGS_ERROR, error });
    },
  });
}

export function createBlog(blog: SaveBlog): RootThunkAction {
  return apiCallThunkAction<Blog>({
    callApi: async () => blogApi.createBlog(blog),
    schema: blogSchema,

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.CREATE_BLOG, blog });
    },
    onSuccess: (entities, blog) => dispatch => {
      dispatch(showSuccessToast('Blog has been created.'));
      dispatch({ type: BlogActionTypes.CREATE_BLOG_SUCCESS, entities, blog });
      blogIdb.saveBlog(blog).catch();
    },
    onError: error => dispatch => {
      dispatch({ type: BlogActionTypes.CREATE_BLOG_ERROR, error });
    },
  });
}

export function updateBlog(blog: SaveBlog): RootThunkAction {
  return apiCallThunkAction<Blog>({
    callApi: async () => blogApi.updateBlog(blog),
    schema: blogSchema,

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.UPDATE_BLOG, blog });
    },
    onSuccess: (entities, blog) => dispatch => {
      dispatch(showSuccessToast('Blog has been updated.'));
      dispatch({ type: BlogActionTypes.UPDATE_BLOG_SUCCESS, entities });
      blogIdb.saveBlog(blog).catch();
    },
    onError: error => dispatch => {
      dispatch({ type: BlogActionTypes.UPDATE_BLOG_ERROR, error });
    },
  });
}

export function deleteBlog(id: string): RootThunkAction {
  return apiCallThunkAction<void>({
    callApi: async () => blogApi.deleteBlog(id),

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.DELETE_BLOG, id });
    },
    onSuccess: () => dispatch => {
      dispatch(showSuccessToast('Blog has been deleted.'));
      dispatch({ type: BlogActionTypes.DELETE_BLOG_SUCCESS, id });
      blogIdb.deleteBlog(id).catch();
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: BlogActionTypes.DELETE_BLOG_ERROR, error });
    },
  });
}
