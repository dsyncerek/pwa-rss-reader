import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchArticlesPage } from '../../actions/articleActions';
import Layout from '../../components/Layout/Layout';
import { RootState } from '../../reducers';
import ArticleList from './components/ArticleList';

const mapState = (state: RootState) => ({
  articles: Object.values(state.entityState.articles),
});

const mapDispatch = {
  fetchArticlesPage,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps;
type ArticlesPageProps = PropsFromRedux & PropsFromRouter;

const ArticlesPage: FC<ArticlesPageProps> = ({ articles, fetchArticlesPage }) => {
  useEffect(() => {
    fetchArticlesPage(1);
  }, [fetchArticlesPage]);

  return (
    <Layout>
      <ArticleList articles={articles} />
    </Layout>
  );
};

export default connector(ArticlesPage);
