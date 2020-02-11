import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

type LoaderProps = {};

const Loader: FC<LoaderProps> = () => (
  <div className="d-flex justify-content-center p-4">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default Loader;
