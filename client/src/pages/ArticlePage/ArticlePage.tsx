import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from '../../common/components/Layout';
import { selectAsyncStatus } from '../../core/async/async.selectors';
import { AsyncInfo } from '../../core/async/components/AsyncInfo';
import { fetchArticle, markArticleAsReadOptimistic } from '../../features/article/article.actions';
import { selectArticle } from '../../features/article/article.selectors';
import ArticleDetails from '../../features/article/components/ArticleDetails';

export const ArticlePage: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const article = useSelector(state => selectArticle(state, id));
  const [fetching, fetchError] = useSelector(state => selectAsyncStatus(state, [fetchArticle]));
  const markAsRead = useCallback(id => dispatch(markArticleAsReadOptimistic({ id })), [dispatch]);

  useEffect(() => {
    dispatch(fetchArticle({ id }));
  }, [dispatch, id]);

  return (
    <Layout>
      <AsyncInfo loading={fetching} error={fetchError} />
      {article && <ArticleDetails article={article} markAsRead={markAsRead} />}
    </Layout>
  );
};
