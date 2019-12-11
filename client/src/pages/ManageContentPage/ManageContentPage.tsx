import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { createBlog, deleteBlog, fetchAllBlogs, updateBlog } from '../../actions/blogActions';
import { createCategory, deleteCategory, fetchAllCategories, updateCategory } from '../../actions/categoryActions';
import Layout from '../../components/Layout/Layout';
import { RootState } from '../../reducers';
import { blogErrorSelector, blogLoadingSelector, blogsSelector } from '../../selectors/blogSelectors';
import { categoriesSelector, categoryErrorSelector, categoryLoadingSelector } from '../../selectors/categorySelectors';
import BlogTable from './components/BlogTable';
import CategoryTable from './components/CategoryTable';

const mapState = (state: RootState) => ({
  blogs: blogsSelector(state),
  blogLoading: blogLoadingSelector(state),
  blogError: blogErrorSelector(state),
  categories: categoriesSelector(state),
  categoryLoading: categoryLoadingSelector(state),
  categoryError: categoryErrorSelector(state),
});

const mapDispatch = {
  fetchAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsFromRouter = RouteComponentProps;
type ManageContentPageProps = PropsFromRedux & PropsFromRouter;

const ManageContentPage: FC<ManageContentPageProps> = ({
  blogs,
  blogLoading,
  blogError,
  categories,
  categoryLoading,
  categoryError,
  createBlog,
  updateBlog,
  deleteBlog,
  createCategory,
  updateCategory,
  deleteCategory,
}) => (
  <Layout>
    <Row>
      <Col lg={4}>
        <CategoryTable
          categories={categories}
          loading={categoryLoading}
          error={categoryError}
          onCreate={createCategory}
          onUpdate={updateCategory}
          onDelete={deleteCategory}
        />
      </Col>
      <Col lg={8}>
        <BlogTable
          blogs={blogs}
          categories={categories}
          loading={blogLoading || categoryLoading}
          error={blogError}
          onCreate={createBlog}
          onUpdate={updateBlog}
          onDelete={deleteBlog}
        />
      </Col>
    </Row>
  </Layout>
);

export default connector(ManageContentPage);
