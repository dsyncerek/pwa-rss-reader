import React, { FC, ReactNode } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect, ConnectedProps } from 'react-redux';
import { BlogActionTypes } from '../actions/blogActionTypes';
import { CategoryActionTypes } from '../actions/categoryActionTypes';
import { hideToast } from '../actions/toastActions';
import ContentList from '../components/ContentList';
import Toasts from '../components/Toasts';
import { RootState } from '../reducers';
import { errorSelector, loadingSelector } from '../selectors/asyncSelectors';
import { blogsSelector } from '../selectors/blogSelectors';
import { categoriesSelector } from '../selectors/categorySelectors';
import { toastsSelector } from '../selectors/toastSelectors';

const mapState = (state: RootState) => ({
  blogs: blogsSelector(state),
  categories: categoriesSelector(state),
  fetching: loadingSelector(state, [BlogActionTypes.FETCH_ALL_BLOGS, CategoryActionTypes.FETCH_ALL_CATEGORIES]),
  fetchError: errorSelector(state, [BlogActionTypes.FETCH_ALL_BLOGS, CategoryActionTypes.FETCH_ALL_CATEGORIES]),
  toasts: toastsSelector(state),
});

const mapDispatch = {
  hideToast,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type LayoutProps = PropsFromRedux & { children: ReactNode };

const Layout: FC<LayoutProps> = ({ children, blogs, categories, fetching, fetchError, toasts, hideToast }) => (
  <main>
    <Container fluid>
      <Row>
        <Col xl={2} lg={4} className="bg-light py-4">
          <aside>
            <h1>RSS Reader</h1>
            <ContentList blogs={blogs} categories={categories} loading={fetching} error={fetchError?.message} />
          </aside>
        </Col>
        <Col xl={{ span: 8, offset: 1 }} lg={8} className="py-5">
          {children}
        </Col>
      </Row>
    </Container>

    <Toasts onClose={hideToast} toasts={toasts} />
  </main>
);

export default connector(Layout);
