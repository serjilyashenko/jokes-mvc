import { Injectable } from '@nestjs/common';
import { BaseTypeOrmRepository } from '../base.typeorm.repositoty';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { IUserRepository } from '../../../domain/user/user.repository.interface';

@Injectable()
export class UserTypeormRepository
  extends BaseTypeOrmRepository<UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
}
