import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ManageBlogs } from '../../features/blog/components/ManageBlogs';
import { ManageCategories } from '../../features/category/components/ManageCategories';

export const ManageContentPage: FC = () => (
  <Row>
    <Col xl={4} className="mb-5 mb-xl-0">
      <ManageCategories />
    </Col>
    <Col xl={8}>
      <ManageBlogs />
    </Col>
  </Row>
);
