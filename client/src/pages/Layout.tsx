import React, { FC, ReactNode } from 'react';
import { Navbar } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect, ConnectedProps } from 'react-redux';
import { BlogActionTypes } from '../blog/redux/blogActionTypes';
import { blogsSelector } from '../blog/redux/blogSelectors';
import { CategoryActionTypes } from '../category/redux/categoryActionTypes';
import { categoriesSelector } from '../category/redux/categorySelectors';
import { errorSelector, loadingSelector } from '../common/async/asyncSelectors';
import ContentList from '../common/components/ContentList';
import Loader from '../common/components/Loader';
import { hideToast } from '../common/toast/toastActions';
import Toasts from '../common/toast/Toasts';
import { toastsSelector } from '../common/toast/toastSelectors';
import { RootState } from '../store/reducers';

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
          <Navbar expand="lg" collapseOnSelect>
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="mb-0">RSS Reader</h1>

              <Navbar.Toggle as={Button} className="text-white" aria-controls="navbar-nav">
                <span className="fas fa-fw fa-bars" />
              </Navbar.Toggle>
            </div>

            <div className="mt-2">
              {fetching && <Loader />}

              {fetchError && (
                <Alert className="mb-0" variant="danger">
                  {fetchError.message}
                </Alert>
              )}
            </div>

            <Navbar.Collapse className="mt-2" id="navbar-nav">
              <ContentList blogs={blogs} categories={categories} />
            </Navbar.Collapse>
          </Navbar>
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
