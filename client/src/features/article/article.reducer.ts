import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import {
  fetchArticle,
  fetchArticlesPage,
  fetchBlogArticlesPage,
  fetchCategoryArticlesPage,
  initArticlesFromIdb,
  markArticleAsReadOptimistic,
} from './article.actions';
import { Article, articleSortComparer } from './models/Article';

export const articleFeatureKey = 'article';
export const articleAdapter = createEntityAdapter<Article>({ sortComparer: articleSortComparer });

export interface ArticleState extends EntityState<Article> {}

export const initialState: ArticleState = articleAdapter.getInitialState();

export const articleReducer = createReducer(initialState, builder => {
  builder.addCase(initArticlesFromIdb.fulfilled, (state, { payload }) => {
    articleAdapter.upsertMany(state, payload.entities?.articles || {});
  });
  builder.addCase(fetchArticlesPage.fulfilled, (state, { payload }) => {
    articleAdapter.upsertMany(state, payload.entities?.articles || {});
  });
  builder.addCase(fetchBlogArticlesPage.fulfilled, (state, { payload }) => {
    articleAdapter.upsertMany(state, payload.entities?.articles || {});
  });
  builder.addCase(fetchCategoryArticlesPage.fulfilled, (state, { payload }) => {
    articleAdapter.upsertMany(state, payload.entities?.articles || {});
  });
  builder.addCase(fetchArticle.fulfilled, (state, { payload }) => {
    articleAdapter.upsertMany(state, payload.entities?.articles || {});
  });
  builder.addCase(markArticleAsReadOptimistic.pending, (state, { meta: { arg } }) => {
    articleAdapter.updateOne(state, { id: arg.id, changes: { read: true } });
  });
  builder.addCase(markArticleAsReadOptimistic.rejected, (state, { meta: { arg } }) => {
    articleAdapter.updateOne(state, { id: arg.id, changes: { read: false } });
  });
});
