import { HttpError } from '../../../common/models/HttpError';

export interface AsyncStatus {
  loading: boolean;
  error?: HttpError;
}
