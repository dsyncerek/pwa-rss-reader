import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from '../article/article.module';
import { RssModule } from '../rss/rss.module';
import { BlogController } from './blog.controller';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), RssModule, ArticleModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
