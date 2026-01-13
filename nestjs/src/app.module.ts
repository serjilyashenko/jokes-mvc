import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { GreetingModule } from './application/greeting/greeting.module';
import { AuthModule } from './application/auth/auth.module';
import { JokeModule } from './application/joke/joke.module';

@Module({
  imports: [DatabaseModule, GreetingModule, AuthModule, JokeModule],
})
export class AppModule {}
