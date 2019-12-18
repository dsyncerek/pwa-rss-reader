import React, { FC, ReactNode, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { fetchAllBlogs } from '../../actions/blogActions';
import { BlogActionTypes } from '../../actions/blogActionTypes';
import { fetchAllCategories } from '../../actions/categoryActions';
import { CategoryActionTypes } from '../../actions/categoryActionTypes';
import { hideToast } from '../../actions/toastActions';
import { RootState } from '../../reducers';
import { errorSelector, loadingSelector } from '../../selectors/asyncSelectors';
import { blogsSelector } from '../../selectors/blogSelectors';
import { categoriesSelector } from '../../selectors/categorySelectors';
import { toastsSelector } from '../../selectors/toastSelectors';
import ContentList from './components/ContentList';
import Toasts from './components/Toasts';

const mapState = (state: RootState) => ({
  blogs: blogsSelector(state),
  categories: categoriesSelector(state),
  fetching: loadingSelector(state, [BlogActionTypes.FETCH_ALL_BLOGS, CategoryActionTypes.FETCH_ALL_CATEGORIES]),
  fetchError: errorSelector(state, [BlogActionTypes.FETCH_ALL_BLOGS, CategoryActionTypes.FETCH_ALL_CATEGORIES]),
  toasts: toastsSelector(state),
});

const mapDispatch = {
  fetchAllBlogs,
  fetchAllCategories,
  hideToast,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type LayoutProps = PropsFromRedux & { children: ReactNode };

const Layout: FC<LayoutProps> = ({
  children,
  blogs,
  categories,
  fetching,
  fetchError,
  toasts,
  fetchAllBlogs,
  fetchAllCategories,
  hideToast,
}) => {
  useEffect(() => {
    fetchAllBlogs();
    fetchAllCategories();
  }, [fetchAllBlogs, fetchAllCategories]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={2}>
            <ContentList blogs={blogs} categories={categories} loading={fetching} error={fetchError?.message} />
          </Col>
          <Col lg={{ span: 8, offset: 1 }}>{children}</Col>
        </Row>
      </Container>

      <Toasts onClose={hideToast} toasts={toasts} />
    </>
  );
};

export default connector(Layout);
