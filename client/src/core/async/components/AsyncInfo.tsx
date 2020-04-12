import React, { FC } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Loader } from '../../../common/components/Loader';
import { HttpError } from '../../../common/models/HttpError';

type AsyncInfoProps = {
  loading: boolean;
  error?: HttpError;
};

export const AsyncInfo: FC<AsyncInfoProps> = ({ loading, error }) => (
  <>
    {loading && <Loader />}
    {error && (
      <Alert className="mb-0" variant="danger">
        {error.message}
      </Alert>
    )}
  </>
);
