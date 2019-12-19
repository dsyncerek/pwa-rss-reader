import { createSelector } from 'reselect';
import { Article } from '../models/Article';
import { RootState } from '../reducers';
import { EntityState } from '../reducers/entityReducer';
import { categoryBlogsSelector } from './blogSelectors';

export const articlesSelector = createSelector<RootState, EntityState, Article[]>(
  state => state.entityState,
  state => sortArticles(Object.values(state.articles)),
);

export const blogArticlesSelector = createSelector<RootState, string, Article[], string, Article[]>(
  articlesSelector,
  (state, blogId) => blogId,
  (articles, blogId) => sortArticles(articles.filter(article => article.blogId === blogId)),
);

export const categoryArticlesSelector = createSelector<RootState, string, Article[], string[], Article[]>(
  articlesSelector,
  (state, categoryId) => categoryBlogsSelector(state, categoryId).map(blog => blog.id),
  (articles, blogIds) => sortArticles(articles.filter(article => blogIds.includes(article.blogId))),
);

export const articleSelector = createSelector<RootState, string, EntityState, string, Article | undefined>(
  state => state.entityState,
  (state, id) => id,
  (state, id) => state.articles[id],
);

function sortArticles(articles: Article[]): Article[] {
  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}
