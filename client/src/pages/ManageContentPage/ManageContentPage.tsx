import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Layout from '../Layout';
import ManageBlogs from './ManageBlogs';
import ManageCategories from './ManageCategories';

const ManageContentPage: FC = () => (
  <Layout>
    <Row>
      <Col xl={4} className="mb-5 mb-xl-0">
        <ManageCategories />
      </Col>
      <Col xl={8}>
        <ManageBlogs />
      </Col>
    </Row>
  </Layout>
);

export default ManageContentPage;
