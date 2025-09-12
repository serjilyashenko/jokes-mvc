import { Injectable } from '@nestjs/common';
import { JokeEntity } from '../entities/joke.entity';
import { JokeApiDto } from '../dto/joke-api.dto';
import { JokeViewDto } from '../dto/joke-view.dto';

@Injectable()
export class JokeMapper {
  constructor() {}

  toApiDto(entities: JokeEntity[]): JokeApiDto[];
  toApiDto(entity: JokeEntity): JokeApiDto;
  toApiDto(input: JokeEntity | JokeEntity[]): JokeApiDto | JokeApiDto[] {
    if (Array.isArray(input)) {
      return input.map((entity) => this.toApiDto(entity));
    }
    return {
      id: input.id,
      content: input.content,
      createdAt: input.createdAt,
    };
  }

  toViewDto(entities: JokeEntity[]): JokeViewDto[];
  toViewDto(entity: JokeEntity): JokeViewDto;
  toViewDto(input: JokeEntity | JokeEntity[]): JokeViewDto | JokeViewDto[] {
    if (Array.isArray(input)) {
      return input.map((entity) => this.toViewDto(entity));
    }
    return {
      id: input.id,
      content: input.content,
      createdAt: input.createdAt.toLocaleDateString('en-SE'),
    };
  }
}
