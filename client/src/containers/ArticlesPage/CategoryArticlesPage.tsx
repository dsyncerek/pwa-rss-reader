import React, { FC, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchCategoryArticlesPage, markArticleAsReadOptimistic } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import { BlogActionTypes } from '../../actions/blogActionTypes';
import { CategoryActionTypes } from '../../actions/categoryActionTypes';
import { RootState } from '../../reducers';
import { categoryArticlesSelector } from '../../selectors/articleSelectors';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import { categoryArticlesPaginationSelector } from '../../selectors/paginationSelectors';
import Layout from '../Layout';
import ArticleList from '../../components/article/ArticleList';

const mapState = (state: RootState, props: PropsFromRouter) => {
  const slug = props.match.params.id;

  const articles = categoryArticlesSelector(state, slug);

  const fetchActions = [
    ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE,
    BlogActionTypes.FETCH_ALL_BLOGS,
    CategoryActionTypes.FETCH_ALL_CATEGORIES,
  ];

  const fetching = loadingSelector(state, fetchActions);
  const fetchError = errorSelector(state, fetchActions);

  const pagination = categoryArticlesPaginationSelector(state, slug);

  return { articles, pagination, fetching, fetchError };
};

const mapDispatch = {
  fetchCategoryArticlesPage,
  markArticleAsReadOptimistic,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ id: string }>;
type ArticlesPageProps = PropsFromRedux & PropsFromRouter;

const CategoryArticlesPage: FC<ArticlesPageProps> = ({
  articles,
  pagination,
  fetching,
  fetchError,
  fetchCategoryArticlesPage,
  markArticleAsReadOptimistic,
  match,
}) => {
  const id = match.params.id;

  const fetchPage = useCallback(
    page => {
      fetchCategoryArticlesPage(id, page);
    },
    [fetchCategoryArticlesPage, id],
  );

  return (
    <Layout>
      <ArticleList
        articles={articles}
        loading={fetching}
        error={fetchError?.message}
        fetchPage={fetchPage}
        markAsRead={markArticleAsReadOptimistic}
        currentPage={pagination.currentPage}
        totalItems={pagination.totalItems}
        pageCount={pagination.pageCount}
      />
    </Layout>
  );
};

export default connector(CategoryArticlesPage);
