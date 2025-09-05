import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingModule } from './greeting/greeting.module';
import { JokeModule } from './joke/joke.module';

@Module({
  imports: [
    GreetingModule,
    JokeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // TODO: Move to .env
      port: 5432, // TODO: Move to .env
      username: 'postgres', // TODO: Move to .env
      password: 'secret', // TODO: Move to .env
      database: 'postgres', // TODO: Move to .env
      autoLoadEntities: true,
      synchronize: true, // auto-create schema (disable in production!) TODO: disable in prod
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
