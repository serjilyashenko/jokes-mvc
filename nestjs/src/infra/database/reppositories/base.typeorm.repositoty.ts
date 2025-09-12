import { FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseEntity } from '../entitites/base.entity';
import { IBaseRepository } from '../interfaces/base.repository.interface';

@Injectable()
export class BaseTypeOrmRepository<Entity extends BaseEntity>
  implements IBaseRepository<Entity>
{
  constructor(protected readonly repository: Repository<Entity>) {}

  async findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Entity | null> {
    return this.repository.findOneBy({ id } as FindOptionsWhere<Entity>);
  }

  async save(entity: Entity): Promise<Entity> {
    return this.repository.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
