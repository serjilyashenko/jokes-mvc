import { BaseEntity } from 'typeorm';

export interface IBaseRepository<Entity extends BaseEntity> {
  findAll(): Promise<Entity[]>;
  findById(id: string): Promise<Entity | null>;
  create(entity: Entity): Promise<Entity>;
  delete(id: string): Promise<void>;
}
