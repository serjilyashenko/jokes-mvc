import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../infra/database/entitites/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Index()
  @Column({ unique: true })
  username: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;
}
