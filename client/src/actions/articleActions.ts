import * as articleApi from '../api/articleApi';
import { Article, articleSchema } from '../models/Article';
import { Pagination } from '../models/Pagination';
import { RootState } from '../reducers';
import { ArticleActions, ArticleActionTypes } from './articleActionTypes';
import { AsyncAction } from './types';

export function fetchArticlesPage(page: number): AsyncAction<ArticleActions, Pagination<Article>> {
  return {
    callApi: async () => articleApi.fetchArticlesPage(page),
    shouldCallApi: (state: RootState) => true, // todo
    schema: { items: [articleSchema] },

    initAction: () => ({ type: ArticleActionTypes.FETCH_ARTICLES_PAGE, page }),
    successAction: (entities, pagination) => ({
      type: ArticleActionTypes.FETCH_ARTICLES_PAGE_SUCCESS,
      entities,
      pagination,
    }),
    errorAction: error => ({ type: ArticleActionTypes.FETCH_ARTICLES_PAGE_ERROR, error }),
  };
}

export function fetchBlogArticlesPage(blogId: string, page: number): AsyncAction<ArticleActions, Pagination<Article>> {
  return {
    callApi: async () => articleApi.fetchBlogArticlesPage(blogId, page),
    shouldCallApi: (state: RootState) => true, // todo
    schema: { items: [articleSchema] },

    initAction: () => ({ type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE, blogId, page }),
    successAction: (entities, pagination) => ({
      type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS,
      entities,
      pagination,
    }),
    errorAction: error => ({ type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_ERROR, error }),
  };
}

export function fetchCategoryArticlesPage(
  categoryId: string,
  page: number,
): AsyncAction<ArticleActions, Pagination<Article>> {
  return {
    callApi: async () => articleApi.fetchCategoryArticlesPage(categoryId, page),
    shouldCallApi: (state: RootState) => true, // todo
    schema: { items: [articleSchema] },

    initAction: () => ({ type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE, categoryId, page }),
    successAction: (entities, pagination) => ({
      type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS,
      entities,
      pagination,
    }),
    errorAction: error => ({ type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_ERROR, error }),
  };
}

export function fetchArticle(id: string): AsyncAction<ArticleActions> {
  return {
    callApi: async () => articleApi.fetchArticle(id),
    shouldCallApi: (state: RootState) => !state.entityState.articles[id],
    schema: articleSchema,

    initAction: () => ({ type: ArticleActionTypes.FETCH_ARTICLE, id }),
    successAction: entities => ({ type: ArticleActionTypes.FETCH_ARTICLE_SUCCESS, entities }),
    errorAction: error => ({ type: ArticleActionTypes.FETCH_ARTICLE_ERROR, error }),
  };
}
