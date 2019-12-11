import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchArticlesPage } from '../../actions/articleActions';
import Layout from '../../components/Layout/Layout';
import { RootState } from '../../reducers';
import { articlesSelector } from '../../selectors/articleSelectors';
import ArticleList from './components/ArticleList';

const mapState = (state: RootState) => ({
  articles: articlesSelector(state),
  pagination: state.articleState.all,
});

const mapDispatch = {
  fetchArticlesPage,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps;
type ArticlesPageProps = PropsFromRedux & PropsFromRouter;

const ArticlesPage: FC<ArticlesPageProps> = ({ articles, fetchArticlesPage, pagination }) => {
  const loadNextPage = () => {
    fetchArticlesPage(pagination.currentPage + 1);
  };

  return (
    <Layout>
      <ArticleList articles={articles} onScrolledBottom={loadNextPage} />
    </Layout>
  );
};

export default connector(ArticlesPage);
