import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { fetchArticle } from '../../actions/articleActions';
import { RootState } from '../../reducers';
import { articleSelector } from '../../selectors/articleSelectors';
import Layout from '../Layout/Layout';
import ArticleDetails from './components/ArticleDetails';

const mapState = (state: RootState, props: PropsFromRouter) => ({
  article: articleSelector(state, props.match.params.slug),
});

const mapDispatch = {
  fetchArticle,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps<{ slug: string }>;
type ArticlePageProps = PropsFromRedux & PropsFromRouter;

const ArticlePage: FC<ArticlePageProps> = ({ article, fetchArticle, match }) => {
  useEffect(() => {
    fetchArticle(match.params.slug);
  }, [fetchArticle, match.params.slug]);

  return <Layout>{article && <ArticleDetails article={article} blogName="Comander" />}</Layout>;
};

export default connector(ArticlePage);
