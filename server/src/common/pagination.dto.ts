export class PaginationDto<T> {
  items: T[];
  totalItems: number;
  pageCount: number;
  currentPage: number;

  constructor(items: T[], total: number, page: number, size: number) {
    this.items = items;
    this.totalItems = total;
    this.currentPage = page;
    this.pageCount = Math.ceil(total / size);
  }
}
