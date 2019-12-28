import React, { FC, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchBlogArticlesPage, markArticleAsReadOptimistic } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import ArticleList from '../../components/article/ArticleList';
import { RootState } from '../../reducers';
import { blogArticlesSelector } from '../../selectors/articleSelectors';
import { loadingSelector } from '../../selectors/asyncSelectors';
import { blogArticlesPageCountSelector } from '../../selectors/paginationSelectors';
import Layout from '../Layout';

const mapState = (state: RootState, props: PropsFromRouter) => ({
  articles: blogArticlesSelector(state, props.match.params.id),
  fetching: loadingSelector(state, [ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE]),
  pageCount: blogArticlesPageCountSelector(state, props.match.params.id),
});

const mapDispatch = {
  fetchBlogArticlesPage,
  markArticleAsReadOptimistic,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ id: string }>;
type ArticlesPageProps = PropsFromRedux & PropsFromRouter;

const BlogArticlesPage: FC<ArticlesPageProps> = ({
  articles,
  fetching,
  pageCount,
  fetchBlogArticlesPage,
  markArticleAsReadOptimistic,
  match,
}) => {
  const id = match.params.id;

  const fetchPage = useCallback(page => fetchBlogArticlesPage(id, page), [fetchBlogArticlesPage, id]);

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

export default connector(BlogArticlesPage);
