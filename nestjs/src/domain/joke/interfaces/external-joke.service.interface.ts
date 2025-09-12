import { ExternalJokeEntity } from '../../../client/external-joke/entities/external-joke.entity';

export const IExternalJokeServiceToken = 'IExternalJokeService';

export interface IExternalJokeService {
  getJoke(): Promise<ExternalJokeEntity | null>;
}
