import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { selectAsyncStatus } from '../../../core/async/async.selectors';
import { AsyncInfo } from '../../../core/async/components/AsyncInfo';
import { fetchArticle, markArticleAsReadOptimistic } from '../article.actions';
import { selectArticle } from '../article.selectors';
import ArticleDetails from './ArticleDetails';

export const ArticlePage: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();
  const article = useSelector(state => selectArticle(state, id));
  const [fetching, fetchError] = useSelector(state => selectAsyncStatus(state, [fetchArticle]));
  const markAsReadCb = useCallback(id => dispatch(markArticleAsReadOptimistic({ id })), [dispatch]);

  useEffect(() => {
    dispatch(fetchArticle({ id }));
  }, [dispatch, id]);

  return (
    <>
      <AsyncInfo loading={fetching} error={fetchError} />
      {article && <ArticleDetails article={article} markAsRead={markAsReadCb} />}
    </>
  );
};
