import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ArticlePage from './containers/ArticlePage/ArticlePage';
import AllArticlesPage from './containers/ArticlesPage/AllArticlesPage';
import BlogArticlesPage from './containers/ArticlesPage/BlogArticlesPage';
import CategoryArticlesPage from './containers/ArticlesPage/CategoryArticlesPage';
import ManageContentPage from './containers/ManageContentPage/ManageContentPage';
import { configureStore } from './store/configureStore';

const store = configureStore();

const App: FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
