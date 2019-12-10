export interface Pagination<T> {
  items: T[];
  totalItems: number;
  pageCount: number;
  currentPage: number;
}
