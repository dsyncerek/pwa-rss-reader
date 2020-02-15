import React, { FC, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import ArticleList from '../../modules/article/components/ArticleList';
import { fetchBlogArticlesPage, markArticleAsReadOptimistic } from '../../modules/article/article.actions';
import { ArticleActionTypes } from '../../modules/article/article.action-types';
import { blogArticlesSelector } from '../../modules/article/article.selectors';
import { loadingSelector } from '../../core/async/async.selectors';
import { blogArticlesPageCountSelector } from '../../core/pagination/pagination.selectors';
import { RootState } from '../../store/reducers';
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
