import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/entitites/base.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('jokes')
export class JokeEntity extends BaseEntity {
  @Index()
  @Column({ name: 'user_id', type: 'bigint' })
  userId: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_jokes_users_id',
  })
  user: UserEntity;
}
