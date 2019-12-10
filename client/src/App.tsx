import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import ManageContentPage from './pages/ManageContentPage/ManageContentPage';
import { configureStore } from './store/configureStore';

const store = configureStore();

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ArticlesPage} />
          <Route path="/article/:slug" component={ArticlePage} />
          <Route path="/category/:slug" component={ArticlePage} />
          <Route path="/blog/:slug" component={ArticlePage} />
          <Route path="/manage-content" component={ManageContentPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
