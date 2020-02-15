import { Pagination } from '../../core/pagination/models/Pagination';
import {
  allArticlesLoadedPagesSelector,
  blogArticlesLoadedPagesSelector,
  categoryArticlesLoadedPagesSelector,
} from '../../core/pagination/pagination.selectors';
import { showErrorToast } from '../../core/toast/toast.actions';
import { apiCallThunkAction } from '../../common/utils/apiCallThunkAction';
import { RootThunkAction } from '../../store/rootTypes';
import * as articleApi from './article.api';
import * as articleIdb from './article.idb';
import { Article, articleSchema } from './models/Article';
import { ArticleActionTypes } from './article.action-types';

export function fetchArticlesPage(page: number): RootThunkAction {
  return apiCallThunkAction<Pagination<Article>>({
    callApi: async () => articleApi.fetchArticlesPage(page),
    shouldCallApi: state => !allArticlesLoadedPagesSelector(state).includes(page),
    schema: { items: [articleSchema] },

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_PAGE, page });
    },
    onSuccess: (entities, pagination) => async dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_PAGE_SUCCESS, entities, pagination });
      articleIdb.saveArticles(pagination.items).catch();
    },
    onError: error => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLES_PAGE_ERROR, error });
    },
  });
}

export function fetchBlogArticlesPage(blogId: string, page: number): RootThunkAction {
  return apiCallThunkAction<Pagination<Article>>({
    callApi: async () => articleApi.fetchBlogArticlesPage(blogId, page),
    shouldCallApi: state => !blogArticlesLoadedPagesSelector(state, blogId).includes(page),
    schema: { items: [articleSchema] },

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE, blogId, page });
    },
    onSuccess: (entities, pagination) => async dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_SUCCESS, blogId, entities, pagination });
      articleIdb.saveArticles(pagination.items).catch();
    },
    onError: error => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE_ERROR, error });
    },
  });
}

export function fetchCategoryArticlesPage(categoryId: string, page: number): RootThunkAction {
  return apiCallThunkAction<Pagination<Article>>({
    callApi: async () => articleApi.fetchCategoryArticlesPage(categoryId, page),
    shouldCallApi: state => !categoryArticlesLoadedPagesSelector(state, categoryId).includes(page),
    schema: { items: [articleSchema] },

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE, categoryId, page });
    },
    onSuccess: (entities, pagination) => async dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_SUCCESS, categoryId, entities, pagination });
      articleIdb.saveArticles(pagination.items).catch();
    },
    onError: error => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE_ERROR, error });
    },
  });
}

export function fetchArticle(id: string): RootThunkAction {
  return apiCallThunkAction<Article>({
    callApi: async () => articleApi.fetchArticle(id),
    shouldCallApi: state => !state.entityState.articles[id],
    schema: articleSchema,

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLE, id });
    },
    onSuccess: (entities, article) => async dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_SUCCESS, entities });
      articleIdb.saveArticles([article]).catch();
    },
    onError: error => dispatch => {
      dispatch({ type: ArticleActionTypes.FETCH_ARTICLE_ERROR, error });
    },
  });
}

export function markArticleAsReadOptimistic(id: string): RootThunkAction {
  return apiCallThunkAction<void>({
    callApi: async () => articleApi.markArticleAsRead(id),

    onInit: () => dispatch => {
      dispatch({ type: ArticleActionTypes.MARK_ARTICLE_AS_READ_OPTIMISTIC, id });
      articleIdb.updateArticle(id, { read: true }).catch();
    },
    onError: error => dispatch => {
      dispatch(showErrorToast(error.message));
      dispatch({ type: ArticleActionTypes.MARK_ARTICLE_AS_UNREAD_OPTIMISTIC, id });
      articleIdb.updateArticle(id, { read: false }).catch();
    },
  });
}
