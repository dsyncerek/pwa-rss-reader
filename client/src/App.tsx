import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useNetwork } from 'react-use';
import { Layout } from './common/components/Layout';
import { Loader } from './common/components/Loader';
import { AppDispatch } from './core/store';
import { initArticlesFromIdb } from './features/article/article.actions';
import { fetchAllBlogs, initBlogsFromIdb } from './features/blog/blog.actions';
import { fetchAllCategories, initCategoriesFromIdb } from './features/category/category.actions';
import { ArticlePage } from './features/article/components/ArticlePage';
import { ArticlesPage } from './features/article/components/ArticlesPage';
import { ManageContentPage } from './common/components/ManageContentPage';

export const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const { online } = useNetwork();

  useEffect(() => {
    if (online) {
      dispatch(fetchAllBlogs());
      dispatch(fetchAllCategories());
    }
  }, [online, dispatch]);

  useEffect(() => {
    Promise.allSettled([
      dispatch(initArticlesFromIdb()),
      dispatch(initBlogsFromIdb()),
      dispatch(initCategoriesFromIdb()),
    ]).then(() => setInitialized(true));
  }, [dispatch]);

  if (!initialized) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={ArticlesPage} />
          <Route path="/article/:id" component={ArticlePage} />
          <Route path="/category/:id" render={props => <ArticlesPage {...props} type="category" />} />
          <Route path="/blog/:id" render={props => <ArticlesPage {...props} type="blog" />} />
          <Route path="/manage-content" component={ManageContentPage} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
