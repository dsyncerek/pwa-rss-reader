export class HttpError extends Error {
  error: string = 'Internal Server Error';
  statusCode: number = 500;
  message: string = 'Something went wrong.';

  constructor(obj: Partial<HttpError> = {}) {
    super();
    Object.assign(this, obj);
  }
}
