import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchArticle } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import ArticleDetails from '../../components/article/ArticleDetails';
import { RootState } from '../../reducers';
import { articleSelector } from '../../selectors/articleSelectors';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import Layout from '../Layout';

const mapState = (state: RootState, props: PropsFromRouter) => ({
  article: articleSelector(state, props.match.params.id),
  fetching: loadingSelector(state, [ArticleActionTypes.FETCH_ARTICLE]),
  fetchError: errorSelector(state, [ArticleActionTypes.FETCH_ARTICLE]),
});

const mapDispatch = {
  fetchArticle,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ id: string }>;
type ArticlePageProps = PropsFromRedux & PropsFromRouter;

const ArticlePage: FC<ArticlePageProps> = ({ article, fetching, fetchError, fetchArticle, match }) => {
  const id = match.params.id;

  useEffect(() => {
    fetchArticle(id);
  }, [fetchArticle, id]);

  return (
    <Layout>
      <ArticleDetails article={article} loading={fetching} error={fetchError?.message} />
    </Layout>
  );
};

export default connector(ArticlePage);
