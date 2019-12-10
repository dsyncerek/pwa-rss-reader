export class HttpError extends Error {
  error: string = '';
  statusCode: number = 500;
  message: string = '';

  constructor(obj: Partial<HttpError> = { error: '', statusCode: 500, message: '' }) {
    super();
    Object.assign(this, obj);
  }
}
