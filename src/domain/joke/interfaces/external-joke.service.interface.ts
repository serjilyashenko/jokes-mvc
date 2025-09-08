import { ExternalJokeDto } from '../../../client/external-joke/dto/external-joke.dto';

export const IExternalJokeServiceToken = 'IExternalJokeService';

export interface IExternalJokeService {
  getRandomJoke(): Promise<ExternalJokeDto>;
}
