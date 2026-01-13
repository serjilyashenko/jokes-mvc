import { IBaseRepository } from '../../infrastructure/database/interfaces/base.repository.interface';
import { UserEntity } from '../../infrastructure/reppositories/user/entities/user.entity';

export const IUserRepositoryToken = 'IUserRepository';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserRepository extends IBaseRepository<UserEntity> {}
