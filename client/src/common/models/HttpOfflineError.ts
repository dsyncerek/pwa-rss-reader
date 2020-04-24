import { HttpError } from './HttpError';

export class HttpOfflineError extends HttpError {
  error: string = 'Offline';
  statusCode: number = 503;
  message: string = 'Looks, you are offline.';
}
