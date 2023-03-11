/* eslint-disable @typescript-eslint/no-var-requires */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const compression = require('compression');

async function bootstrap() {
  const PORT = 8000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(compression());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
