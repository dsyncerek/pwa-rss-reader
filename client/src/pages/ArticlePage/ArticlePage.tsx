import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import ArticleDetails from '../../features/article/components/ArticleDetails';
import { fetchArticle, markArticleAsReadOptimistic } from '../../features/article/article.actions';
import { ArticleActionTypes } from '../../features/article/article.action-types';
import { articleSelector } from '../../features/article/article.selectors';
import { errorSelector, loadingSelector } from '../../core/async/async.selectors';
import { RootState } from '../../store/reducers';
import Layout from '../Layout';

const mapState = (state: RootState, props: PropsFromRouter) => ({
  article: articleSelector(state, props.match.params.id),
  fetching: loadingSelector(state, [ArticleActionTypes.FETCH_ARTICLE]),
  fetchError: errorSelector(state, [ArticleActionTypes.FETCH_ARTICLE]),
});

const mapDispatch = {
  fetchArticle,
  markArticleAsReadOptimistic,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ id: string }>;
type ArticlePageProps = PropsFromRedux & PropsFromRouter;

const ArticlePage: FC<ArticlePageProps> = ({
  article,
  fetching,
  fetchError,
  fetchArticle,
  markArticleAsReadOptimistic,
  match,
}) => {
  const id = match.params.id;

  useEffect(() => {
    fetchArticle(id);
  }, [fetchArticle, id]);

  return (
    <Layout>
      <ArticleDetails
        article={article}
        loading={fetching}
        error={fetchError?.message}
        markAsRead={markArticleAsReadOptimistic}
      />
    </Layout>
  );
};

export default connector(ArticlePage);
