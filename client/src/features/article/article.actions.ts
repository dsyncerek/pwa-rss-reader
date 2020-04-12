import { createAsyncCallThunk } from '../../common/utils/createAsyncCallThunk';
import { Pagination } from '../../core/pagination/models/Pagination';
import { showErrorToast } from '../../core/toast/toast.actions';
import * as articleApi from './article.api';
import * as articleIdb from './article.idb';
import { Article, articleSchema } from './models/Article';

export const initArticlesFromIdb = createAsyncCallThunk<Article[]>(`article/initArticlesFromIdb`, () => ({
  call: () => articleIdb.fetchAllArticles(),
  schema: [articleSchema],
}));

export const fetchArticlesPage = createAsyncCallThunk<Pagination<Article>, { page: number }>(
  `article/fetchArticlesPage`,
  ({ page }) => ({
    call: () => articleApi.fetchArticlesPage(page),
    shouldCall: state => !state.pagination.articles.all?.loadedPages.includes(page),
    schema: { items: [articleSchema] },
    onSuccess: pagination => articleIdb.saveArticles(pagination.items).catch(),
  }),
);

export const fetchBlogArticlesPage = createAsyncCallThunk<Pagination<Article>, { blogId: string; page: number }>(
  `article/fetchBlogArticlesPage`,
  ({ blogId, page }) => ({
    call: () => articleApi.fetchBlogArticlesPage(blogId, page),
    shouldCall: state => !state.pagination.articles.byBlog[blogId]?.loadedPages.includes(page),
    schema: { items: [articleSchema] },
    onSuccess: pagination => articleIdb.saveArticles(pagination.items).catch(),
  }),
);

export const fetchCategoryArticlesPage = createAsyncCallThunk<Pagination<Article>,
  { categoryId: string; page: number }>(`article/fetchCategoryArticlesPage`, ({ categoryId, page }) => ({
  call: () => articleApi.fetchCategoryArticlesPage(categoryId, page),
  shouldCall: state => !state.pagination.articles.byCategory[categoryId]?.loadedPages.includes(page),
  schema: { items: [articleSchema] },
  onSuccess: pagination => articleIdb.saveArticles(pagination.items).catch(),
}));

export const fetchArticle = createAsyncCallThunk<Article, { id: string }>(`article/fetchArticle`, ({ id }) => ({
  call: () => articleApi.fetchArticle(id),
  shouldCall: state => !state.article.entities[id],
  schema: articleSchema,
  onSuccess: article => articleIdb.saveArticles([article]).catch(),
}));

export const markArticleAsReadOptimistic = createAsyncCallThunk<void, { id: string }>(
  `article/markArticleAsReadOptimistic`,
  ({ id }, { dispatch }) => ({
    call: () => articleApi.markArticleAsRead(id),
    onInit: () => articleIdb.updateArticle(id, { read: true }).catch(),
    onError: error => {
      dispatch(showErrorToast(error.message));
      articleIdb.updateArticle(id, { read: false }).catch();
    },
  }),
);
