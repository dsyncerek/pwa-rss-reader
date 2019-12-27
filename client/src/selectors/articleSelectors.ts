import { createSelector } from 'reselect';
import { Article } from '../models/Article';
import { Blog } from '../models/Blog';
import { Dictionary } from '../models/Dictionary';
import { RootState } from '../reducers';
import { blogsSelector, categoryBlogsSelector } from './blogSelectors';

export const articlesSelector = createSelector<RootState, Dictionary<Article>, Blog[], Article[]>(
  state => state.entityState.articles,
  blogsSelector,
  (articles, blogs) => sortArticles(Object.values(articles).map(article => prepareArticle(article, blogs))),
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

export const articleSelector = createSelector<RootState, string, Article, Blog[], Article | undefined>(
  (state, id) => state.entityState.articles[id],
  blogsSelector,
  (article, blogs) => (article ? prepareArticle(article, blogs) : undefined),
);

function prepareArticle(article: Article, blogs: Blog[]): Article {
  const blog = blogs.find(blog => blog.id === article.blogId);
  return { ...article, blog };
}

function sortArticles(articles: Article[]): Article[] {
  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}
