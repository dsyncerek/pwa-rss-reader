import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';

const Loader: FC = () => (
  <div className="d-flex justify-content-center p-5">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default Loader;
