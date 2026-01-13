import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IcanhazdadJokeService } from './icanhazdad-joke.service';
import { IExternalJokeServiceToken } from '../../../domain/external-joke/external-joke.service.interface';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: IExternalJokeServiceToken,
      useClass: IcanhazdadJokeService,
    },
  ],
  exports: [IExternalJokeServiceToken],
})
export class IcanhazdadJokeModule {}
