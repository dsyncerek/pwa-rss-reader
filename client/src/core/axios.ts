import axios, { AxiosError, AxiosResponse } from 'axios';
import { HttpError } from '../common/models/HttpError';
import { HttpOfflineError } from '../common/models/HttpOfflineError';

export const axiosInstance = axios.create({ baseURL: '/api/' });

axiosInstance.interceptors.response.use(handleResponse, handleError);

function handleResponse<T>(response: AxiosResponse<T>): T {
  return response.data;
}

function handleError(error: AxiosError): never {
  if (error.response) {
    throw new HttpError(error.response.data);
  } else {
    throw new HttpOfflineError();
  }
}
