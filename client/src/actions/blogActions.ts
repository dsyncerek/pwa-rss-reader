import * as blogApi from '../api/blogApi';
import { blogSchema, SaveBlog } from '../models/Blog';
import { RootState } from '../reducers';
import { BlogActionTypes } from './blogActionTypes';
import { showErrorToast, showSuccessToast } from './toastActions';
import { AsyncAction } from './types';

export function fetchAllBlogs(): AsyncAction {
  return {
    callApi: async () => blogApi.fetchAllBlogs(),
    shouldCallApi: (state: RootState) => !state.blogState.allLoaded,
    schema: [blogSchema],

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.FETCH_ALL_BLOGS });
    },
    onSuccess: entities => dispatch => {
      dispatch({ type: BlogActionTypes.FETCH_ALL_BLOGS_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: BlogActionTypes.FETCH_ALL_BLOGS_ERROR, error });
    },
  };
}

export function fetchBlog(id: string): AsyncAction {
  return {
    callApi: async () => blogApi.fetchBlog(id),
    shouldCallApi: (state: RootState) => !state.entityState.blogs[id],
    schema: blogSchema,

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.FETCH_BLOG, id });
    },
    onSuccess: entities => dispatch => {
      dispatch({ type: BlogActionTypes.FETCH_BLOG_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: BlogActionTypes.FETCH_BLOG_ERROR, error });
    },
  };
}

export function createBlog(blog: SaveBlog): AsyncAction {
  return {
    callApi: async () => blogApi.createBlog(blog),
    schema: blogSchema,

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.CREATE_BLOG, blog });
    },
    onSuccess: entities => dispatch => {
      dispatch(showSuccessToast('Blog has been created.'));
      dispatch({ type: BlogActionTypes.CREATE_BLOG_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: BlogActionTypes.CREATE_BLOG_ERROR, error });
    },
  };
}

export function updateBlog(blog: SaveBlog): AsyncAction {
  return {
    callApi: async () => blogApi.updateBlog(blog),
    schema: blogSchema,

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.UPDATE_BLOG, blog });
    },
    onSuccess: entities => dispatch => {
      dispatch(showSuccessToast('Blog has been updated.'));
      dispatch({ type: BlogActionTypes.UPDATE_BLOG_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: BlogActionTypes.UPDATE_BLOG_ERROR, error });
    },
  };
}

export function deleteBlog(id: string): AsyncAction {
  return {
    callApi: async () => blogApi.deleteBlog(id),

    onInit: () => dispatch => {
      dispatch({ type: BlogActionTypes.DELETE_BLOG, id });
    },
    onSuccess: () => dispatch => {
      dispatch(showSuccessToast('Blog has been deleted.'));
      dispatch({ type: BlogActionTypes.DELETE_BLOG_SUCCESS, id });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: BlogActionTypes.DELETE_BLOG_ERROR, error });
    },
  };
}
