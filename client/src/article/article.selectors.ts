import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { EntityState } from '../core/entity/entity.reducer';
import { entityStateSelector } from '../core/entity/entity.selectors';
import { RootState } from '../store/reducers';
import { Article, articleSchema } from './models/Article';

export const articlesSelector = createSelector<RootState, EntityState, Article[]>(entityStateSelector, entities =>
  sortArticles(denormalize(Object.keys(entities.articles), [articleSchema], entities)),
);

export const blogArticlesSelector = createSelector<RootState, string, Article[], string, Article[]>(
  articlesSelector,
  (state, blogId) => blogId,
  (articles, blogId) => articles.filter(article => article.blogId === blogId),
);

export const categoryArticlesSelector = createSelector<RootState, string, Article[], string, Article[]>(
  articlesSelector,
  (state, categoryId) => categoryId,
  (articles, categoryId) => articles.filter(article => article.blog?.categoryId === categoryId),
);

export const articleSelector = createSelector<RootState, string, EntityState, string, Article | undefined>(
  entityStateSelector,
  (state, id) => id,
  (entities, id) => denormalize(entities.articles[id], articleSchema, entities),
);

function sortArticles(articles: Article[]): Article[] {
  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}
