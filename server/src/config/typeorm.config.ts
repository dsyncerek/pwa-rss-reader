import { ConnectionOptions, getConnectionOptions } from 'typeorm';
import { Article } from '../article/article.entity';
import { Blog } from '../blog/blog.entity';

export async function getTypeOrmConfig(): Promise<ConnectionOptions> {
  return {
    ...(await getConnectionOptions()),
    entities: [Article, Blog],
  };
}
