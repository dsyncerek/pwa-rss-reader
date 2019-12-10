import { SaveBlog } from '../models/Blog';
import { Dictionary } from '../models/Dictionary';
import { HttpError } from '../models/HttpError';

export enum BlogActionTypes {
  FETCH_ALL_BLOGS = 'FETCH_ALL_BLOGS',
  FETCH_ALL_BLOGS_SUCCESS = 'FETCH_ALL_BLOGS_SUCCESS',
  FETCH_ALL_BLOGS_ERROR = 'FETCH_ALL_BLOGS_ERROR',

  FETCH_BLOG = 'FETCH_BLOG',
  FETCH_BLOG_SUCCESS = 'FETCH_BLOG_SUCCESS',
  FETCH_BLOG_ERROR = 'FETCH_BLOG_ERROR',

  CREATE_BLOG = 'CREATE_BLOG',
  CREATE_BLOG_SUCCESS = 'CREATE_BLOG_SUCCESS',
  CREATE_BLOG_ERROR = 'CREATE_BLOG_ERROR',

  UPDATE_BLOG = 'UPDATE_BLOG',
  UPDATE_BLOG_SUCCESS = 'UPDATE_BLOG_SUCCESS',
  UPDATE_BLOG_ERROR = 'UPDATE_BLOG_ERROR',

  DELETE_BLOG = 'DELETE_BLOG',
  DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS',
  DELETE_BLOG_ERROR = 'DELETE_BLOG_ERROR',
}

export interface FetchAllBlogsAction {
  type: BlogActionTypes.FETCH_ALL_BLOGS;
}

export interface FetchAllBlogsSuccessAction {
  type: BlogActionTypes.FETCH_ALL_BLOGS_SUCCESS;
  entities: Dictionary<Dictionary>;
}

export interface FetchAllBlogsErrorAction {
  type: BlogActionTypes.FETCH_ALL_BLOGS_ERROR;
  error: HttpError;
}

export interface FetchBlogAction {
  type: BlogActionTypes.FETCH_BLOG;
  id: string;
}

export interface FetchBlogSuccessAction {
  type: BlogActionTypes.FETCH_BLOG_SUCCESS;
  entities: Dictionary<Dictionary>;
}

export interface FetchBlogErrorAction {
  type: BlogActionTypes.FETCH_BLOG_ERROR;
  error: HttpError;
}

export interface CreateBlogAction {
  type: BlogActionTypes.CREATE_BLOG;
  blog: SaveBlog;
}

export interface CreateBlogSuccessAction {
  type: BlogActionTypes.CREATE_BLOG_SUCCESS;
  entities: Dictionary<Dictionary>;
}

export interface CreateBlogErrorAction {
  type: BlogActionTypes.CREATE_BLOG_ERROR;
  error: HttpError;
}

export interface UpdateBlogAction {
  type: BlogActionTypes.UPDATE_BLOG;
  blog: SaveBlog;
}

export interface UpdateBlogSuccessAction {
  type: BlogActionTypes.UPDATE_BLOG_SUCCESS;
  entities: Dictionary<Dictionary>;
}

export interface UpdateBlogErrorAction {
  type: BlogActionTypes.UPDATE_BLOG_ERROR;
  error: HttpError;
}

export interface DeleteBlogAction {
  type: BlogActionTypes.DELETE_BLOG;
  id: string;
}

export interface DeleteBlogSuccessAction {
  type: BlogActionTypes.DELETE_BLOG_SUCCESS;
  id: string;
}

export interface DeleteBlogErrorAction {
  type: BlogActionTypes.DELETE_BLOG_ERROR;
  error: HttpError;
}

export type BlogActions =
  | FetchAllBlogsAction
  | FetchAllBlogsSuccessAction
  | FetchAllBlogsErrorAction
  | FetchBlogAction
  | FetchBlogSuccessAction
  | FetchBlogErrorAction
  | CreateBlogAction
  | CreateBlogSuccessAction
  | CreateBlogErrorAction
  | UpdateBlogAction
  | UpdateBlogSuccessAction
  | UpdateBlogErrorAction
  | DeleteBlogAction
  | DeleteBlogSuccessAction
  | DeleteBlogErrorAction;
