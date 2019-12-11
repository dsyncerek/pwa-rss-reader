import { Article } from '../models/Article';
import { Dictionary } from '../models/Dictionary';
import { HttpError } from '../models/HttpError';
import { Pagination } from '../models/Pagination';

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
}

export interface FetchArticlesPageAction {
  type: ArticleActionTypes.FETCH_ARTICLES_PAGE;
  page: number;
}

export interface FetchArticlesPageSuccessAction {
  type: ArticleActionTypes.FETCH_ARTICLES_PAGE_SUCCESS;
  entities: Dictionary<Dictionary>;
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
  entities: Dictionary<Dictionary>;
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
  entities: Dictionary<Dictionary>;
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
  entities: Dictionary<Dictionary>;
}

export interface FetchArticleErrorAction {
  type: ArticleActionTypes.FETCH_ARTICLE_ERROR;
  error: HttpError;
}

export type ArticleActions =
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
  | FetchArticleErrorAction;
