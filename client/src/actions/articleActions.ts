import * as articleApi from '../api/articleApi';
import { Article, articleSchema } from '../models/Article';
import { Pagination } from '../models/Pagination';
import { RootState } from '../reducers';
import { apiCallThunkAction } from './apiCallThunkAction';
import { ArticleActionTypes } from './articleActionTypes';
import { RootThunkAction } from './rootTypes';
import { showErrorToast } from './toastActions';

export function fetchArticlesPage(page: number): RootThunkAction {
  return apiCallThunkAction<Pagination<Article>>({
    callApi: async () => articleApi.fetchArticlesPage(page),
    shouldCallApi: (state: RootState) => state.articleState.all.currentPage < page,
    schema: { items: [articleSchema] },

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_PAGE, page });
    },
    onSuccess: (entities, pagination) => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_PAGE_SUCCESS, entities, pagination });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_PAGE_ERROR, error });
    },
  });
}

export function fetchBlogArticlesPage(blogId: string, page: number): RootThunkAction {
  return apiCallThunkAction<Pagination<Article>>({
    callApi: async () => articleApi.fetchBlogArticlesPage(blogId, page),
    shouldCallApi: (state: RootState) => (state.articleState.byBlog[blogId]?.currentPage ?? 0) < page,
    schema: { items: [articleSchema] },

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE, blogId, page });
    },
    onSuccess: (entities, pagination) => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS, blogId, entities, pagination });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_ERROR, error });
    },
  });
}

export function fetchCategoryArticlesPage(categoryId: string, page: number): RootThunkAction {
  return apiCallThunkAction<Pagination<Article>>({
    callApi: async () => articleApi.fetchCategoryArticlesPage(categoryId, page),
    shouldCallApi: (state: RootState) => (state.articleState.byCategory[categoryId]?.currentPage ?? 0) < page,
    schema: { items: [articleSchema] },

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE, categoryId, page });
    },
    onSuccess: (entities, pagination) => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS, categoryId, entities, pagination });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_ERROR, error });
    },
  });
}

export function fetchArticle(id: string): RootThunkAction {
  return apiCallThunkAction<Article>({
    callApi: async () => articleApi.fetchArticle(id),
    shouldCallApi: (state: RootState) => !state.entityState.articles[id],
    schema: articleSchema,

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLE, id });
    },
    onSuccess: entities => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_SUCCESS, entities });
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_ERROR, error });
    },
  });
}
