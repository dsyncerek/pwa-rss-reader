import { HttpError } from '../models/HttpError';

export interface AsyncState {
  success: boolean;
  loading: boolean;
  error?: HttpError;
}

export function asyncStateDefault(): AsyncState {
  return { loading: false, success: false, error: undefined };
}

export function asyncStateInit(): AsyncState {
  return { loading: true, success: false, error: undefined };
}

export function asyncStateSuccess(): AsyncState {
  return { loading: false, success: true, error: undefined };
}

export function asyncStateError(error: HttpError): AsyncState {
  return { loading: false, success: false, error: error };
}
