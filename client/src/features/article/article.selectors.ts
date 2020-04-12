import { createSelector } from '@reduxjs/toolkit';
import { denormalize } from 'normalizr';
import { AppState } from '../../core/store';
import { selectBlogEntities } from '../blog/blog.selectors';
import { selectCategoryEntities } from '../category/category.selectors';
import { articleAdapter } from './article.reducer';
import { Article, articleSchema } from './models/Article';

export const {
  selectById: selectArticleById,
  selectEntities: selectArticleEntities,
  selectIds: selectArticleIds,
} = articleAdapter.getSelectors<AppState>(state => state.article);

export const selectAllArticles = createSelector(
  selectArticleIds,
  selectArticleEntities,
  selectBlogEntities,
  selectCategoryEntities,
  (ids, articles, blogs, categories): Article[] => {
    return denormalize(ids, [articleSchema], { articles, blogs, categories });
  },
);

export const selectBlogArticles = createSelector(
  selectAllArticles,
  (state: AppState, blogId: string) => blogId,
  (articles, blogId): Article[] => articles.filter(article => article.blogId === blogId),
);

export const selectCategoryArticles = createSelector(
  selectAllArticles,
  (state: AppState, categoryId: string) => categoryId,
  (articles, categoryId): Article[] => articles.filter(article => article.blog?.categoryId === categoryId),
);

export const selectArticle = createSelector(
  selectArticleById,
  selectBlogEntities,
  selectCategoryEntities,
  (article, blogs, categories): Article | undefined => {
    return denormalize(article, articleSchema, { blogs, categories });
  },
);
