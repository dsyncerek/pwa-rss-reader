import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Toasts } from '../../core/toast/components/Toasts';
import { Sidebar } from './Sidebar';

export const Layout: FC = ({ children }) => (
  <main>
    <Container fluid>
      <Row>
        <Col xl={2} lg={4} className="bg-light py-4">
          <Sidebar />
        </Col>
        <Col xl={{ span: 8, offset: 1 }} lg={8} className="py-5">
          {children}
        </Col>
      </Row>
    </Container>
    <Toasts />
  </main>
);
