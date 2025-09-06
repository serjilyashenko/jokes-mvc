import { Injectable } from '@nestjs/common';
import { Joke } from '../entities/joke.entity';
import { JokeApiDto } from '../dto/joke-api.dto';
import { JokeViewDto } from '../dto/joke-view.dto';
import { CreateJokeDto } from '../dto/create-joke.dto';

@Injectable()
export class JokeMapper {
  constructor() {}

  toApiDto(entities: Joke[]): JokeApiDto[];
  toApiDto(entity: Joke): JokeApiDto;
  toApiDto(input: Joke | Joke[]) {
    if (Array.isArray(input)) {
      return input.map((entity) => this.toApiDto(entity));
    }
    const apiDto = new JokeApiDto();
    apiDto.id = input.id;
    apiDto.content = input.content;
    apiDto.createdAt = input.createdAt;
    return apiDto;
  }

  toViewDto(entities: Joke[]): JokeViewDto[];
  toViewDto(entity: Joke): JokeViewDto;
  toViewDto(input: Joke | Joke[]) {
    if (Array.isArray(input)) {
      return input.map((entity) => this.toViewDto(entity));
    }
    // FIXME: Replace with automapper mapper
    const viewDto = new JokeViewDto();
    viewDto.id = input.id;
    viewDto.content = input.content;
    viewDto.createdAt = input.createdAt.toLocaleDateString('en-SE');
    return viewDto;
  }

  fromCreateDto(dto: CreateJokeDto) {}
}
