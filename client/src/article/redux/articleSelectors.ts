import { createSelector } from 'reselect';
import { Blog } from '../../blog/models/Blog';
import { blogsSelector } from '../../blog/redux/blogSelectors';
import { Dictionary } from '../../common/models/Dictionary';
import { RootState } from '../../store/reducers';
import { Article } from '../models/Article';

export const articlesSelector = createSelector<RootState, Dictionary<Article>, Blog[], Article[]>(
  state => state.entityState.articles,
  blogsSelector,
  (articles, blogs) => {
    return sortArticles(
      Object.values(articles)
        .map(article => prepareArticle(article, blogs)!)
        .filter(Boolean),
    );
  },
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

export const articleSelector = createSelector<RootState, string, Article, Blog[], Article | undefined>(
  (state, id) => state.entityState.articles[id],
  blogsSelector,
  (article, blogs) => (article ? prepareArticle(article, blogs) : undefined),
);

function prepareArticle(article: Article, blogs: Blog[]): Article | undefined {
  const blog = blogs.find(blog => blog.id === article.blogId);

  if (!blog) {
    // if blog doesn't exist, skip article
    return;
  }

  return { ...article, blog };
}

function sortArticles(articles: Article[]): Article[] {
  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}
