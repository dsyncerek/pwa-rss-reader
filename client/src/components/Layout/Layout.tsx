import React, { FC, ReactNode, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { fetchAllBlogs } from '../../actions/blogActions';
import { fetchAllCategories } from '../../actions/categoryActions';
import { RootState } from '../../reducers';
import ContentList from './components/ContentList';

const mapState = (state: RootState) => ({
  blogs: Object.values(state.entityState.blogs),
  categories: Object.values(state.entityState.categories),
});

const mapDispatch = {
  fetchAllBlogs,
  fetchAllCategories,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type LayoutProps = PropsFromRedux & { children: ReactNode };

const Layout: FC<LayoutProps> = ({ children, blogs, categories, fetchAllBlogs, fetchAllCategories }) => {
  useEffect(() => {
    fetchAllBlogs();
    fetchAllCategories();
  }, [fetchAllBlogs, fetchAllCategories]);

  return (
    <Container fluid>
      <Row>
        <Col lg={2}>
          <ContentList blogs={blogs} categories={categories} />
        </Col>
        <Col lg={{ span: 8, offset: 1 }}>{children}</Col>
      </Row>
    </Container>
  );
};

export default connector(Layout);
