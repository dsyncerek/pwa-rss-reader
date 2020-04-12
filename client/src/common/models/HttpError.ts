export class HttpError {
  error: string = 'Internal Server Error';
  statusCode: number = 500;
  message: string = 'Something went wrong.';

  constructor(obj: Partial<HttpError> = {}) {
    this.error = obj.error || this.error;
    this.statusCode = obj.statusCode || this.statusCode;
    this.message = obj.message || this.message;
  }
}
