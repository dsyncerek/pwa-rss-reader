import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from '../../common/components/Layout';
import { selectAsyncStatus } from '../../core/async/async.selectors';
import { AppState } from '../../core/store';
import {
  fetchArticlesPage,
  fetchBlogArticlesPage,
  fetchCategoryArticlesPage,
  markArticleAsReadOptimistic,
} from '../../features/article/article.actions';
import {
  selectAllArticles,
  selectBlogArticles,
  selectCategoryArticles,
} from '../../features/article/article.selectors';
import { ArticleList } from '../../features/article/components/ArticleList';

type ArticlesPageProps = RouteComponentProps<{ id?: string }> & { type?: 'blog' | 'category' };

export const ArticlesPage: FC<ArticlesPageProps> = ({ match, type }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  let articlesSelector, asyncStatusSelector, pageCountSelector;

  if (type === 'blog' && id) {
    articlesSelector = (state: AppState) => selectBlogArticles(state, id);
    asyncStatusSelector = (state: AppState) => selectAsyncStatus(state, [fetchBlogArticlesPage]);
    pageCountSelector = (state: AppState) => state.pagination.articles.byBlog[id]?.pageCount;
  } else if (type === 'category' && id) {
    articlesSelector = (state: AppState) => selectCategoryArticles(state, id);
    asyncStatusSelector = (state: AppState) => selectAsyncStatus(state, [fetchCategoryArticlesPage]);
    pageCountSelector = (state: AppState) => state.pagination.articles.byCategory[id]?.pageCount;
  } else {
    articlesSelector = selectAllArticles;
    asyncStatusSelector = (state: AppState) => selectAsyncStatus(state, [fetchArticlesPage]);
    pageCountSelector = (state: AppState) => state.pagination.articles.all?.pageCount;
  }

  const fetchPageCb = useCallback(
    (page: number) => {
      if (type === 'blog' && id) {
        return dispatch(fetchBlogArticlesPage({ blogId: id, page }));
      } else if (type === 'category' && id) {
        return dispatch(fetchCategoryArticlesPage({ categoryId: id, page }));
      } else {
        return dispatch(fetchArticlesPage({ page }));
      }
    },
    [dispatch, id, type],
  );

  const articles = useSelector(articlesSelector);
  const [fetching] = useSelector(asyncStatusSelector);
  const pageCount = useSelector(pageCountSelector) ?? 0;
  const markAsReadCb = useCallback(id => dispatch(markArticleAsReadOptimistic({ id })), [dispatch]);

  return (
    <Layout>
      <ArticleList
        articles={articles}
        loading={fetching}
        pageCount={pageCount}
        fetchPage={fetchPageCb}
        markAsRead={markAsReadCb}
      />
    </Layout>
  );
};
