import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import ArticleList from '../../modules/article/components/ArticleList';
import { fetchArticlesPage, markArticleAsReadOptimistic } from '../../modules/article/article.actions';
import { ArticleActionTypes } from '../../modules/article/article.action-types';
import { articlesSelector } from '../../modules/article/article.selectors';
import { loadingSelector } from '../../core/async/async.selectors';
import { allArticlesPageCountSelector } from '../../core/pagination/pagination.selectors';
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
