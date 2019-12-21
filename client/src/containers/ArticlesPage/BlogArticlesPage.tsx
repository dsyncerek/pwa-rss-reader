import React, { FC, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchBlogArticlesPage } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import { BlogActionTypes } from '../../actions/blogActionTypes';
import { CategoryActionTypes } from '../../actions/categoryActionTypes';
import { RootState } from '../../reducers';
import { blogArticlesSelector } from '../../selectors/articleSelectors';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import { blogsSelector } from '../../selectors/blogSelectors';
import { categoriesSelector } from '../../selectors/categorySelectors';
import { blogArticlesPaginationSelector } from '../../selectors/paginationSelectors';
import Layout from '../Layout/Layout';
import ArticleList from './components/ArticleList';

const mapState = (state: RootState, props: PropsFromRouter) => {
  const slug = props.match.params.id;

  const articles = blogArticlesSelector(state, slug);
  const blogs = blogsSelector(state);
  const categories = categoriesSelector(state);

  const fetchActions = [
    ArticleActionTypes.FETCH_BLOG_ARTICLES_PAGE,
    BlogActionTypes.FETCH_ALL_BLOGS,
    CategoryActionTypes.FETCH_ALL_CATEGORIES,
  ];

  const fetching = loadingSelector(state, fetchActions);
  const fetchError = errorSelector(state, fetchActions);

  const pagination = blogArticlesPaginationSelector(state, slug);

  return { articles, blogs, categories, pagination, fetching, fetchError };
};

const mapDispatch = {
  fetchBlogArticlesPage,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ id: string }>;
type ArticlesPageProps = PropsFromRedux & PropsFromRouter;

const BlogArticlesPage: FC<ArticlesPageProps> = ({
  articles,
  blogs,
  categories,
  pagination,
  fetching,
  fetchError,
  fetchBlogArticlesPage,
  match,
}) => {
  const id = match.params.id;

  const fetchPage = useCallback(
    page => {
      fetchBlogArticlesPage(id, page);
    },
    [fetchBlogArticlesPage, id],
  );

  return (
    <Layout>
      <ArticleList
        articles={articles}
        blogs={blogs}
        categories={categories}
        loading={fetching}
        error={fetchError?.message}
        fetchPage={fetchPage}
        currentPage={pagination.currentPage}
        totalItems={pagination.totalItems}
        pageCount={pagination.pageCount}
      />
    </Layout>
  );
};

export default connector(BlogArticlesPage);
