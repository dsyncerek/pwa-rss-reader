import React, { FC, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import ArticleList from '../../features/article/components/ArticleList';
import { fetchCategoryArticlesPage, markArticleAsReadOptimistic } from '../../features/article/article.actions';
import { ArticleActionTypes } from '../../features/article/article.action-types';
import { categoryArticlesSelector } from '../../features/article/article.selectors';
import { loadingSelector } from '../../core/async/async.selectors';
import { categoryArticlesPageCountSelector } from '../../core/pagination/pagination.selectors';
import { RootState } from '../../store/reducers';
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
