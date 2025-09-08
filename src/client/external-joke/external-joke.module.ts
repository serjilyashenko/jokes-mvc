import { Module } from '@nestjs/common';
import { IcanhazdadJokeJokeService } from './external-joke.service';
import { IExternalJokeServiceToken } from '../../domain/joke/interfaces/external-joke.service.interface';

@Module({
  imports: [],
  providers: [
    {
      provide: IExternalJokeServiceToken,
      useClass: IcanhazdadJokeJokeService,
    },
  ],
  exports: [IExternalJokeServiceToken],
})
export class ExternalJokeModule {}
