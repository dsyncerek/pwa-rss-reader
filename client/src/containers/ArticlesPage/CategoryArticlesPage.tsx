import React, { FC, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchCategoryArticlesPage, markArticleAsReadOptimistic } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import ArticleList from '../../components/article/ArticleList';
import { RootState } from '../../reducers';
import { categoryArticlesSelector } from '../../selectors/articleSelectors';
import { loadingSelector } from '../../selectors/asyncSelectors';
import { categoryArticlesPageCountSelector } from '../../selectors/paginationSelectors';
import Layout from '../Layout';

const mapState = (state: RootState, props: PropsFromRouter) => ({
  articles: categoryArticlesSelector(state, props.match.params.id),
  fetching: loadingSelector(state, [ArticleActionTypes.FETCH_CATEGORY_ARTICLES_PAGE]),
  pageCount: categoryArticlesPageCountSelector(state, props.match.params.id),
});

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
  fetching,
  pageCount,
  fetchCategoryArticlesPage,
  markArticleAsReadOptimistic,
  match,
}) => {
  const id = match.params.id;

  const fetchPage = useCallback(page => fetchCategoryArticlesPage(id, page), [fetchCategoryArticlesPage, id]);

  return (
    <Layout>
      <ArticleList
        articles={articles}
        loading={fetching}
        pageCount={pageCount}
        fetchPage={fetchPage}
        markAsRead={markArticleAsReadOptimistic}
      />
    </Layout>
  );
};

export default connector(CategoryArticlesPage);
