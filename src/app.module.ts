import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingModule } from './greeting/greeting.module';

@Module({
  imports: [GreetingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
