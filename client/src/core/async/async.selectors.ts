import { createSelector } from 'reselect';
import { HttpError } from '../../common/models/HttpError';
import { AppState } from '../store';

export const selectAsyncStatus = createSelector(
  (state: AppState, types: any[]) => types.map(type => state.async[type?.pending?.type || type]).filter(Boolean),
  (statuses): [boolean, HttpError | undefined] => [
    statuses.some(status => status.loading),
    statuses.map(status => status.error).find(Boolean),
  ],
);
