export interface Pagination<T = any> {
  items: T[];
  totalItems: number;
  pageCount: number;
  currentPage: number;
}
