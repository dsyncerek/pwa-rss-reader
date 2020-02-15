import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { fetchAllBlogs } from './modules/blog/blog.actions';
import { fetchAllCategories } from './modules/category/category.actions';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import AllArticlesPage from './pages/ArticlesPage/AllArticlesPage';
import BlogArticlesPage from './pages/ArticlesPage/BlogArticlesPage';
import CategoryArticlesPage from './pages/ArticlesPage/CategoryArticlesPage';
import ManageContentPage from './pages/ManageContentPage/ManageContentPage';

const mapState = () => ({});

const mapDispatch = {
  fetchAllBlogs,
  fetchAllCategories,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const App: FC<PropsFromRedux> = ({ fetchAllBlogs, fetchAllCategories }) => {
  useEffect(() => {
    fetchAllBlogs();
    fetchAllCategories();
  }, [fetchAllBlogs, fetchAllCategories]);

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
