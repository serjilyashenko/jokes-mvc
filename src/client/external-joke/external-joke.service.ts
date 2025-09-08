import { Injectable } from '@nestjs/common';
import { IExternalJokeService } from '../../domain/joke/interfaces/external-joke.service.interface';
import { ExternalJokeDto } from './dto/external-joke.dto';

@Injectable()
export class IcanhazdadJokeJokeService implements IExternalJokeService {
  getRandomJoke(): Promise<ExternalJokeDto> {
    return Promise.resolve({
      // TODO: replace with HttpModule method call
      joke: "Why don't scientists trust atoms? Because they make up everything!",
    });
  }
}
