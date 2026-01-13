import { ExternalJokeEntity } from '../../infrastructure/client/icanhazdad/entitites/external-joke.entity';

export const IExternalJokeServiceToken = 'IExternalJokeService';

export interface IExternalJokeService {
  getJoke(): Promise<ExternalJokeEntity | null>;
}
