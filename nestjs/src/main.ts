import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppDataSource } from './data-soruce';
import { setupApp } from './setupApp';

async function bootstrap() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  setupApp(app, { swagger: true, morgan: true });
  await app.listen(8080);
}
bootstrap();
