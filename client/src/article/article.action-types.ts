import { EntitiesType } from '../core/entity/types';
import { HttpError } from '../common/models/HttpError';
import { Pagination } from '../core/pagination/models/Pagination';
import { Article } from './models/Article';

export enum ArticleActionTypes {
  FETCH_ARTICLES_PAGE = 'FETCH_ARTICLES_PAGE',
  FETCH_ARTICLES_PAGE_SUCCESS = 'FETCH_ARTICLES_PAGE_SUCCESS',
  FETCH_ARTICLES_PAGE_ERROR = 'FETCH_ARTICLES_PAGE_ERROR',

  FETCH_BLOG_ARTICLES_PAGE = 'FETCH_BLOG_ARTICLES_PAGE',
  FETCH_BLOG_ARTICLES_PAGE_SUCCESS = 'FETCH_BLOG_ARTICLES_PAGE_SUCCESS',
  FETCH_BLOG_ARTICLES_PAGE_ERROR = 'FETCH_BLOG_ARTICLES_PAGE_ERROR',

  FETCH_CATEGORY_ARTICLES_PAGE = 'FETCH_CATEGORY_ARTICLES_PAGE',
  FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS = 'FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS',
  FETCH_CATEGORY_ARTICLES_PAGE_ERROR = 'FETCH_CATEGORY_ARTICLES_PAGE_ERROR',

  FETCH_ARTICLE = 'FETCH_ARTICLE',
  FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS',
  FETCH_ARTICLE_ERROR = 'FETCH_ARTICLE_ERROR',

  MARK_ARTICLE_AS_READ_OPTIMISTIC = 'MARK_ARTICLE_AS_READ_OPTIMISTIC',
  MARK_ARTICLE_AS_UNREAD_OPTIMISTIC = 'MARK_ARTICLE_AS_UNREAD_OPTIMISTIC',
}

export interface FetchArticlesPageAction {
  type: ArticleActionTypes.FETCH_ARTICLES_PAGE;
  page: number;
}

export interface FetchArticlesPageSuccessAction {
  type: ArticleActionTypes.FETCH_ARTICLES_PAGE_SUCCESS;
  entities: EntitiesType;
  pagination: Pagination<Article>;
}

export interface FetchArticlesPageErrorAction {
  type: ArticleActionTypes.FETCH_ARTICLES_PAGE_ERROR;
  error: HttpError;
}

export interface FetchBlogArticlesPageAction {
  type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE;
  page: number;
  blogId: string;
}

export interface FetchBlogArticlesPageSuccessAction {
  type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS;
  blogId: string;
  entities: EntitiesType;
  pagination: Pagination<Article>;
}

export interface FetchBlogArticlesPageErrorAction {
  type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_ERROR;
  error: HttpError;
}

export interface FetchCategoryArticlesPageAction {
  type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE;
  page: number;
  categoryId: string;
}

export interface FetchCategoryArticlesPageSuccessAction {
  type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS;
  categoryId: string;
  entities: EntitiesType;
  pagination: Pagination<Article>;
}

export interface FetchCategoryArticlesPageErrorAction {
  type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_ERROR;
  error: HttpError;
}

export interface FetchArticleAction {
  type: ArticleActionTypes.FETCH_ARTICLE;
  id: string;
}

export interface FetchArticleSuccessAction {
  type: ArticleActionTypes.FETCH_ARTICLE_SUCCESS;
  entities: EntitiesType;
}

export interface FetchArticleErrorAction {
  type: ArticleActionTypes.FETCH_ARTICLE_ERROR;
  error: HttpError;
}

export interface MarkArticleAsReadOptimisticAction {
  type: ArticleActionTypes.MARK_ARTICLE_AS_READ_OPTIMISTIC;
  id: string;
}

export interface MarkArticleAsUnreadOptimisticAction {
  type: ArticleActionTypes.MARK_ARTICLE_AS_UNREAD_OPTIMISTIC;
  id: string;
}

export type ArticleAction =
  | FetchArticlesPageAction
  | FetchArticlesPageSuccessAction
  | FetchArticlesPageErrorAction
  | FetchBlogArticlesPageAction
  | FetchBlogArticlesPageSuccessAction
  | FetchBlogArticlesPageErrorAction
  | FetchCategoryArticlesPageAction
  | FetchCategoryArticlesPageSuccessAction
  | FetchCategoryArticlesPageErrorAction
  | FetchArticleAction
  | FetchArticleSuccessAction
  | FetchArticleErrorAction
  | MarkArticleAsReadOptimisticAction
  | MarkArticleAsUnreadOptimisticAction;
