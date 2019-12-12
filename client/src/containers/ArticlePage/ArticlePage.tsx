import React, { FC, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchArticle } from '../../actions/articleActions';
import { ArticleActionTypes } from '../../actions/articleActionTypes';
import { BlogActionTypes } from '../../actions/blogActionTypes';
import { CategoryActionTypes } from '../../actions/categoryActionTypes';
import Loader from '../../components/Loader';
import { RootState } from '../../reducers';
import { articleSelector } from '../../selectors/articleSelectors';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import { blogSelector } from '../../selectors/blogSelectors';
import { categorySelector } from '../../selectors/categorySelectors';
import Layout from '../Layout/Layout';
import ArticleDetails from './components/ArticleDetails';

const mapState = (state: RootState, props: PropsFromRouter) => {
  const article = articleSelector(state, props.match.params.slug);
  const blog = blogSelector(state, article?.blogId ?? '');
  const category = categorySelector(state, blog?.categoryId ?? '');
  const fetching = loadingSelector(state, [
    ArticleActionTypes.FETCH_ARTICLE,
    BlogActionTypes.FETCH_ALL_BLOGS,
    CategoryActionTypes.FETCH_ALL_CATEGORIES,
  ]);
  const fetchError = errorSelector(state, [
    ArticleActionTypes.FETCH_ARTICLE,
    BlogActionTypes.FETCH_ALL_BLOGS,
    CategoryActionTypes.FETCH_ALL_CATEGORIES,
  ]);

  return { article, blog, category, fetching, fetchError };
};

const mapDispatch = {
  fetchArticle,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ slug: string }>;
type ArticlePageProps = PropsFromRedux & PropsFromRouter;

const ArticlePage: FC<ArticlePageProps> = ({ article, blog, category, fetching, fetchError, fetchArticle, match }) => {
  useEffect(() => {
    fetchArticle(match.params.slug);
  }, [fetchArticle, match.params.slug]);

  return (
    <Layout>
      <Loader loading={fetching}>
        {fetchError && <Alert variant="danger">{fetchError.message}</Alert>}

        {article && blog && category && <ArticleDetails article={article} blog={blog} category={category} />}
      </Loader>
    </Layout>
  );
};

export default connector(ArticlePage);
