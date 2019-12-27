import React, { FC, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchArticle } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import { BlogActionTypes } from '../../actions/blogActionTypes';
import { CategoryActionTypes } from '../../actions/categoryActionTypes';
import Loader from '../../components/Loader';
import { RootState } from '../../reducers';
import { articleSelector } from '../../selectors/articleSelectors';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import Layout from '../Layout/Layout';
import ArticleDetails from './components/ArticleDetails';

const mapState = (state: RootState, props: PropsFromRouter) => {
  const article = articleSelector(state, props.match.params.id);

  const fetchActions = [
    ArticleActionTypes.FETCH_ARTICLE,
    BlogActionTypes.FETCH_ALL_BLOGS,
    CategoryActionTypes.FETCH_ALL_CATEGORIES,
  ];

  const fetching = loadingSelector(state, fetchActions);
  const fetchError = errorSelector(state, fetchActions);

  return { article, fetching, fetchError };
};

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
      <Loader loading={fetching}>
        {fetchError && <Alert variant="danger">{fetchError.message}</Alert>}
        {article && <ArticleDetails article={article} />}
      </Loader>
    </Layout>
  );
};

export default connector(ArticlePage);
