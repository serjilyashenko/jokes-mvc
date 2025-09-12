import { JokeEntity } from '../entities/joke.entity';
import { IBaseRepository } from '../../../infra/database/interfaces/base.repository.interface';

export const IJokeRepositoryToken = 'IJokeRepository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJokeRepository extends IBaseRepository<JokeEntity> {}
