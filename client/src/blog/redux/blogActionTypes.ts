import { EntitiesType } from '../../common/entity/types';
import { HttpError } from '../../common/models/HttpError';
import { Blog, SaveBlog } from '../models/Blog';

export enum BlogActionTypes {
  FETCH_ALL_BLOGS = 'FETCH_ALL_BLOGS',
  FETCH_ALL_BLOGS_SUCCESS = 'FETCH_ALL_BLOGS_SUCCESS',
  FETCH_ALL_BLOGS_ERROR = 'FETCH_ALL_BLOGS_ERROR',

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
  entities: EntitiesType;
}

export interface FetchAllBlogsErrorAction {
  type: BlogActionTypes.FETCH_ALL_BLOGS_ERROR;
  error: HttpError;
}

export interface CreateBlogAction {
  type: BlogActionTypes.CREATE_BLOG;
  blog: SaveBlog;
}

export interface CreateBlogSuccessAction {
  type: BlogActionTypes.CREATE_BLOG_SUCCESS;
  blog: Blog;
  entities: EntitiesType;
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
  entities: EntitiesType;
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

export type BlogAction =
  | FetchAllBlogsAction
  | FetchAllBlogsSuccessAction
  | FetchAllBlogsErrorAction
  | CreateBlogAction
  | CreateBlogSuccessAction
  | CreateBlogErrorAction
  | UpdateBlogAction
  | UpdateBlogSuccessAction
  | UpdateBlogErrorAction
  | DeleteBlogAction
  | DeleteBlogSuccessAction
  | DeleteBlogErrorAction;
