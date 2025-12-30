import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppDataSource } from './data-soruce';
import { setupApp } from './setupApp';
import { runSeed } from './seed/seed.seed';

async function bootstrap() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  await runSeed(AppDataSource); // seed test and guest users

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  setupApp(app, { swagger: true, morgan: true });
  await app.listen(8080);
}
bootstrap();
