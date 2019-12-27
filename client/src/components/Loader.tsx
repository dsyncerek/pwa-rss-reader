import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

type LoaderProps = { loading?: boolean };

const Loader: FC<LoaderProps> = () => (
  <div className="d-flex justify-content-center m-4">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default Loader;
