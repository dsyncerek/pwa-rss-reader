import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ArticlePage from './containers/ArticlePage/ArticlePage';
import ArticlesPage from './containers/ArticlesPage/ArticlesPage';
import ManageContentPage from './containers/ManageContentPage/ManageContentPage';
import { configureStore } from './store/configureStore';

const store = configureStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ArticlesPage} />
          <Route path="/article/:slug" component={ArticlePage} />
          <Route path="/category/:slug" component={ArticlesPage} />
          <Route path="/blog/:slug" component={ArticlesPage} />
          <Route path="/manage-content" component={ManageContentPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
