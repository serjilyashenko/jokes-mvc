import { join } from 'path';
import hbs from 'hbs';
import morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppDataSource } from './data-soruce';

async function bootstrap() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(morgan('dev'));

  // app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials')); // rebuild app to apply changes in partials

  const config = new DocumentBuilder()
    .setTitle('Jokes MVC API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(8080);
}
bootstrap();
