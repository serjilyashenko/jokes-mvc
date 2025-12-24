import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { GreetingModule } from './domain/greeting/greeting.module';
import { AuthModule } from './domain/auth/auth.module';
import { JokeModule } from './domain/joke/joke.module';

@Module({
  imports: [DatabaseModule, GreetingModule, AuthModule, JokeModule],
})
export class AppModule {}
