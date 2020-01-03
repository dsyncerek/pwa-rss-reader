import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { config } from 'dotenv';

config();

(async (): Promise<void> => {
  const AppModule = (await import('./app.module')).AppModule;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(compression());

  const swaggerOptions = new DocumentBuilder().setTitle('RSS Reader API').build();

  SwaggerModule.setup('openapi', app, SwaggerModule.createDocument(app, swaggerOptions));

  await app.listen(+process.env.PORT);
})();
