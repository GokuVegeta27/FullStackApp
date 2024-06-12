/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './users/handle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // true for all origins
    origin: '*',
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
