import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ArticleModule } from './modules/article/article.module';
import { BlogModule } from './modules/blog/blog.module';
import { CategoryModule } from './modules/category/category.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { getTypeOrmConfig } from './config/typeorm.config';

const clientBuildPath = join(__dirname, '../..', 'client/build');

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
