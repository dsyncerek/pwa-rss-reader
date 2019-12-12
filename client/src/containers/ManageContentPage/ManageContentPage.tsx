import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Layout from '../Layout/Layout';
import ManageBlogs from './ManageBlogs';
import ManageCategories from './ManageCategories';

const ManageContentPage: FC = () => (
  <Layout>
    <Row>
      <Col lg={4}>
        <ManageCategories />
      </Col>
      <Col lg={8}>
        <ManageBlogs />
      </Col>
    </Row>
  </Layout>
);

export default ManageContentPage;
