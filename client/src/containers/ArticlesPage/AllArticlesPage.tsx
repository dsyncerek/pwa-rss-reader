import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchArticlesPage, markArticleAsReadOptimistic } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import { BlogActionTypes } from '../../actions/blogActionTypes';
import { CategoryActionTypes } from '../../actions/categoryActionTypes';
import { RootState } from '../../reducers';
import { articlesSelector } from '../../selectors/articleSelectors';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import { allArticlesPaginationSelector } from '../../selectors/paginationSelectors';
import Layout from '../Layout/Layout';
import ArticleList from './components/ArticleList';

const mapState = (state: RootState) => {
  const articles = articlesSelector(state);

  const fetchActions = [
    ArticleActionTypes.FETCH_ARTICLES_PAGE,
    BlogActionTypes.FETCH_ALL_BLOGS,
    CategoryActionTypes.FETCH_ALL_CATEGORIES,
  ];

  const fetching = loadingSelector(state, fetchActions);
  const fetchError = errorSelector(state, fetchActions);

  const pagination = allArticlesPaginationSelector(state);

  return { articles, pagination, fetching, fetchError };
};

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
  pagination,
  fetching,
  fetchError,
  fetchArticlesPage,
  markArticleAsReadOptimistic,
}) => (
  <Layout>
    <ArticleList
      articles={articles}
      loading={fetching}
      error={fetchError?.message}
      fetchPage={fetchArticlesPage}
      markAsRead={markArticleAsReadOptimistic}
      currentPage={pagination.currentPage}
      totalItems={pagination.totalItems}
      pageCount={pagination.pageCount}
    />
  </Layout>
);

export default connector(AllArticlesPage);
