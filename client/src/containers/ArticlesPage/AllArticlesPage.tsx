import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchArticlesPage, markArticleAsReadOptimistic } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import ArticleList from '../../components/article/ArticleList';
import { RootState } from '../../reducers';
import { articlesSelector } from '../../selectors/articleSelectors';
import { loadingSelector } from '../../selectors/asyncSelectors';
import Layout from '../Layout';

const mapState = (state: RootState) => ({
  articles: articlesSelector(state),
  fetching: loadingSelector(state, [ArticleActionTypes.FETCH_ARTICLES_PAGE]),
});

const mapDispatch = {
  fetchArticlesPage,
  markArticleAsReadOptimistic,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps;
type ArticlesPageProps = PropsFromRedux & PropsFromRouter;

const AllArticlesPage: FC<ArticlesPageProps> = ({
  articles,
  fetching,
  fetchArticlesPage,
  markArticleAsReadOptimistic,
}) => (
  <Layout>
    <ArticleList
      articles={articles}
      loading={fetching}
      fetchPage={fetchArticlesPage}
      markAsRead={markArticleAsReadOptimistic}
    />
  </Layout>
);

export default connector(AllArticlesPage);
