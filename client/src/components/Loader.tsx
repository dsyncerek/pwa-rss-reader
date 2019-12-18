import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

type LoaderProps = {
  loading?: boolean;
};

const Loader: FC<LoaderProps> = ({ children, loading }) => (
  <>
    {loading ? (
      <div className="d-flex justify-content-center p-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    ) : (
      children
    )}
  </>
);

export default Loader;
