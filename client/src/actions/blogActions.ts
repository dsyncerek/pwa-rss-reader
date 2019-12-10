import * as blogApi from '../api/blogApi';
import { blogSchema, SaveBlog } from '../models/Blog';
import { RootState } from '../reducers';
import { BlogActions, BlogActionTypes } from './blogActionTypes';
import { AsyncAction } from './types';

export function fetchAllBlogs(): AsyncAction<BlogActions> {
  return {
    callApi: async () => blogApi.fetchAllBlogs(),
    shouldCallApi: (state: RootState) => !state.blogState.allLoaded,
    schema: [blogSchema],

    initAction: () => ({ type: BlogActionTypes.FETCH_ALL_BLOGS }),
    successAction: entities => ({ type: BlogActionTypes.FETCH_ALL_BLOGS_SUCCESS, entities }),
    errorAction: error => ({ type: BlogActionTypes.FETCH_ALL_BLOGS_ERROR, error }),
  };
}

export function fetchBlog(id: string): AsyncAction<BlogActions> {
  return {
    callApi: async () => blogApi.fetchBlog(id),
    shouldCallApi: (state: RootState) => !state.entityState.blogs[id],
    schema: blogSchema,

    initAction: () => ({ type: BlogActionTypes.FETCH_BLOG, id }),
    successAction: entities => ({ type: BlogActionTypes.FETCH_BLOG_SUCCESS, entities }),
    errorAction: error => ({ type: BlogActionTypes.FETCH_BLOG_ERROR, error }),
  };
}

export function createBlog(blog: SaveBlog): AsyncAction<BlogActions> {
  return {
    callApi: async () => blogApi.createBlog(blog),
    schema: blogSchema,

    initAction: () => ({ type: BlogActionTypes.CREATE_BLOG, blog }),
    successAction: entities => ({ type: BlogActionTypes.CREATE_BLOG_SUCCESS, entities }),
    errorAction: error => ({ type: BlogActionTypes.CREATE_BLOG_ERROR, error }),
  };
}

export function updateBlog(blog: SaveBlog): AsyncAction<BlogActions> {
  return {
    callApi: async () => blogApi.updateBlog(blog),
    schema: blogSchema,

    initAction: () => ({ type: BlogActionTypes.UPDATE_BLOG, blog }),
    successAction: entities => ({ type: BlogActionTypes.UPDATE_BLOG_SUCCESS, entities }),
    errorAction: error => ({ type: BlogActionTypes.UPDATE_BLOG_ERROR, error }),
  };
}

export function deleteBlog(id: string): AsyncAction<BlogActions> {
  return {
    callApi: async () => blogApi.deleteBlog(id),

    initAction: () => ({ type: BlogActionTypes.DELETE_BLOG, id }),
    successAction: () => ({ type: BlogActionTypes.DELETE_BLOG_SUCCESS, id }),
    errorAction: error => ({ type: BlogActionTypes.DELETE_BLOG_ERROR, error }),
  };
}
