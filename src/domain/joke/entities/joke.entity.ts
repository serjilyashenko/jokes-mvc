import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../infra/database/entitites/base.entity';

@Entity()
export class JokeEntity extends BaseEntity {
  @Column()
  content: string;
}
