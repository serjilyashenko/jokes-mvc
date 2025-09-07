import { Injectable } from '@nestjs/common';
import { Joke } from '../entities/joke.entity';
import { JokeApiDto } from '../dto/joke-api.dto';
import { JokeViewDto } from '../dto/joke-view.dto';

@Injectable()
export class JokeMapper {
  constructor() {}

  toApiDto(entities: Joke[]): JokeApiDto[];
  toApiDto(entity: Joke): JokeApiDto;
  toApiDto(input: Joke | Joke[]): JokeApiDto | JokeApiDto[] {
    if (Array.isArray(input)) {
      return input.map((entity) => this.toApiDto(entity));
    }
    return {
      id: input.id,
      content: input.content,
      createdAt: input.createdAt,
    };
  }

  toViewDto(entities: Joke[]): JokeViewDto[];
  toViewDto(entity: Joke): JokeViewDto;
  toViewDto(input: Joke | Joke[]): JokeViewDto | JokeViewDto[] {
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
