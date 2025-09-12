import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IcanhazdadJokeJokeService } from './external-joke.service';
import { IExternalJokeServiceToken } from '../../domain/joke/interfaces/external-joke.service.interface';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: IExternalJokeServiceToken,
      useClass: IcanhazdadJokeJokeService,
    },
  ],
  exports: [IExternalJokeServiceToken],
})
export class ExternalJokeModule {}
