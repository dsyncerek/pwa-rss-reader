export class PaginationDto<T> {
  items: T[];
  totalItems: number;
  pageCount: number;
  currentPage: number;

  constructor(pagination: PaginationDto<T>) {
    Object.assign(this, pagination);
  }
}
