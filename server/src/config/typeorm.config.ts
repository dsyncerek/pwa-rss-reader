import { ConnectionOptions, getConnectionOptions } from 'typeorm';
import { Article } from '../modules/article/article.entity';
import { Blog } from '../modules/blog/blog.entity';
import { Category } from '../modules/category/category.entity';

export async function getTypeOrmConfig(): Promise<ConnectionOptions> {
  return {
    ...(await getConnectionOptions()),
    entities: [Article, Blog, Category],
  };
}
