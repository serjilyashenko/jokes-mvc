import { Module } from '@nestjs/common';
import { GreetingModule } from './domain/greeting/greeting.module';
import { JokeModule } from './domain/joke/joke.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, GreetingModule, JokeModule],
})
export class AppModule {}
