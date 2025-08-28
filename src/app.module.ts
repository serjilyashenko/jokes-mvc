import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingModule } from './greeting/greeting.module';
import { JokeModule } from './joke/joke.module';

@Module({
  imports: [GreetingModule, JokeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
