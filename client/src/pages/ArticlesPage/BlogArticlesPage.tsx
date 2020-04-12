import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from '../../common/components/Layout';
import { selectAsyncStatus } from '../../core/async/async.selectors';
import { fetchBlogArticlesPage, markArticleAsReadOptimistic } from '../../features/article/article.actions';
import { selectBlogArticles } from '../../features/article/article.selectors';
import { ArticleList } from '../../features/article/components/ArticleList';

export const BlogArticlesPage: FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const blogId = match.params.id;
  const dispatch = useDispatch();
  const articles = useSelector(state => selectBlogArticles(state, blogId));
  const [fetching] = useSelector(state => selectAsyncStatus(state, [fetchBlogArticlesPage]));
  const pageCount = useSelector(state => state.pagination.articles.byBlog[blogId]?.pageCount);
  const fetchPageCb = useCallback(page => dispatch(fetchBlogArticlesPage({ blogId, page })), [dispatch, blogId]);

  return (
    <Layout>
      <ArticleList
        articles={articles}
        loading={fetching}
        pageCount={pageCount || 0}
        fetchPage={fetchPageCb}
        markAsRead={id => dispatch(markArticleAsReadOptimistic({ id }))}
      />
    </Layout>
  );
};
