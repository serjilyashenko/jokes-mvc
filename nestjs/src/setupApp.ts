import { NestExpressApplication } from '@nestjs/platform-express';
import morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import hbs from 'hbs';
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

  app.useStaticAssets(join(ROOT_DIR, 'public'));
  app.setBaseViewsDir(join(ROOT_DIR, 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(ROOT_DIR, 'views/partials')); // rebuild app to apply changes in partials

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
