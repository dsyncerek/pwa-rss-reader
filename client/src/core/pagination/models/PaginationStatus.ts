import { Pagination } from './Pagination';

export interface PaginationStatus {
  totalItems: number;
  pageCount: number;
  loadedPages: number[];
}

export function merge<T>(status?: PaginationStatus, pagination?: Pagination<T>): PaginationStatus | undefined {
  if (!pagination) {
    return status;
  }

  return {
    totalItems: pagination.totalItems,
    pageCount: pagination.pageCount,
    loadedPages: status?.loadedPages ? [...status.loadedPages, pagination.currentPage] : [pagination.currentPage],
  };
}
