import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from './request-circles/filters/global-http-exception.filter';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  await app.listen(3333);
}
bootstrap();
