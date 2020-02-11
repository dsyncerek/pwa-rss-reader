import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import ArticleList from '../../article/components/ArticleList';
import { fetchArticlesPage, markArticleAsReadOptimistic } from '../../article/redux/articleActions';
import { ArticleActionTypes } from '../../article/redux/articleActionTypes';
import { articlesSelector } from '../../article/redux/articleSelectors';
import { loadingSelector } from '../../common/async/asyncSelectors';
import { allArticlesPageCountSelector } from '../../common/pagination/paginationSelectors';
import { RootState } from '../../store/reducers';
import Layout from '../Layout';

const mapState = (state: RootState) => ({
  articles: articlesSelector(state),
  fetching: loadingSelector(state, [ArticleActionTypes.FETCH_ARTICLES_PAGE]),
  pageCount: allArticlesPageCountSelector(state),
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
  pageCount,
  fetchArticlesPage,
  markArticleAsReadOptimistic,
}) => (
  <Layout>
    <ArticleList
      articles={articles}
      loading={fetching}
      pageCount={pageCount}
      fetchPage={fetchArticlesPage}
      markAsRead={markArticleAsReadOptimistic}
    />
  </Layout>
);

export default connector(AllArticlesPage);
