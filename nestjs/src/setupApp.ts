import { NestExpressApplication } from '@nestjs/platform-express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { engine } from 'express-handlebars';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const ROOT_DIR = process.cwd();

type SetupAppOptions = {
  swagger?: boolean;
  morgan?: boolean;
};

export function setupApp(
  app: NestExpressApplication,
  options: SetupAppOptions = {},
) {
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(cookieParser());

  app.useStaticAssets(join(ROOT_DIR, 'public'));
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', join(ROOT_DIR, 'views'));

  if (options?.morgan) {
    app.use(morgan('dev'));
  }

  if (options?.swagger) {
    const config = new DocumentBuilder()
      .setTitle('Jokes MVC API')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }
}
