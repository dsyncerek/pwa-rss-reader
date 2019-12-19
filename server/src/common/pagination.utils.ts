import { SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from './pagination.dto';

export async function getPaginationResponse<T>(
  query: SelectQueryBuilder<T>,
  page: number,
  size: number = 20,
): Promise<PaginationDto<T>> {
  const [items, total] = await query
    .skip((page - 1) * size)
    .take(size)
    .getManyAndCount();

  return new PaginationDto<T>(items, total, page, size);
}
