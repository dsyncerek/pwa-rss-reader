import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { getArticlesFromIndexedDb } from './actions/articleActions';
import { fetchAllBlogs } from './actions/blogActions';
import { fetchAllCategories } from './actions/categoryActions';
import ArticlePage from './containers/ArticlePage/ArticlePage';
import AllArticlesPage from './containers/ArticlesPage/AllArticlesPage';
import BlogArticlesPage from './containers/ArticlesPage/BlogArticlesPage';
import CategoryArticlesPage from './containers/ArticlesPage/CategoryArticlesPage';
import ManageContentPage from './containers/ManageContentPage/ManageContentPage';
import { RootState } from './reducers';

const mapState = (state: RootState) => ({});

const mapDispatch = {
  fetchAllBlogs,
  fetchAllCategories,
  getArticlesFromIndexedDb,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const App: FC<PropsFromRedux> = ({ fetchAllBlogs, fetchAllCategories, getArticlesFromIndexedDb }) => {
  useEffect(() => {
    fetchAllBlogs();
    fetchAllCategories();
    getArticlesFromIndexedDb();
  }, [fetchAllBlogs, fetchAllCategories, getArticlesFromIndexedDb]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AllArticlesPage} />
        <Route path="/article/:id" component={ArticlePage} />
        <Route path="/category/:id" component={CategoryArticlesPage} />
        <Route path="/blog/:id" component={BlogArticlesPage} />
        <Route path="/manage-content" component={ManageContentPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default connector(App);
