import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../common/components/Layout';
import { selectAsyncStatus } from '../../core/async/async.selectors';
import { fetchArticlesPage, markArticleAsReadOptimistic } from '../../features/article/article.actions';
import { selectAllArticles } from '../../features/article/article.selectors';
import { ArticleList } from '../../features/article/components/ArticleList';

export const AllArticlesPage: FC = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectAllArticles);
  const [fetching] = useSelector(state => selectAsyncStatus(state, [fetchArticlesPage]));
  const pageCount = useSelector(state => state.pagination.articles.all?.pageCount);
  const fetchPageCb = useCallback(page => dispatch(fetchArticlesPage({ page })), [dispatch]);

  return (
    <Layout>
      <ArticleList
        articles={articles}
        loading={fetching}
        pageCount={pageCount || 0}
        fetchPage={fetchPageCb}
        markAsRead={id => dispatch(markArticleAsReadOptimistic({ id }))}
      />
    </Layout>
  );
};
