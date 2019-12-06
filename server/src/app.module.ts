import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ArticleModule } from './article/article.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { getTypeOrmConfig } from './config/typeorm.config';

const clientBuildPath = join(__dirname, '../..', 'client/build');

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: clientBuildPath }),
    TypeOrmModule.forRootAsync({ useFactory: async () => getTypeOrmConfig() }),
    ArticleModule,
    BlogModule,
    CategoryModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_PIPE, useValue: new ValidationPipe({ skipMissingProperties: true, whitelist: true }) },
  ],
})
export class AppModule {}
