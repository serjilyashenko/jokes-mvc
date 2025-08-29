import { Injectable } from '@nestjs/common';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { CreateJokeDto } from './dto/create-joke.dto';
import { JokeViewDto } from './dto/joke-view.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class JokeService {
  create(createJokeDto: CreateJokeDto) {
    console.log('>> joke created', createJokeDto.content);
    return 'This action adds a new joke';
  }

  findAll() {
    return `This action returns all joke`;
  }

  findAllViewDto(): Array<JokeViewDto> {
    // FIXME: Replace with real data from Repository layer
    // FIXME: Replace with automapper mapper
    return ['joke 1', 'joke 2', 'joke 3'].map((content, index) =>
      plainToInstance(JokeViewDto, {
        id: String(index),
        content,
        createdAt: new Date(),
        password: 'secret', // Should be excluded !
      }),
    );
  }

  // Not implemented yet
  findOne(id: number) {
    return `This action returns a #${id} joke`;
  }

  // Not implemented yet
  update(id: number, updateJokeDto: UpdateJokeDto) {
    return `This action updates a #${id} joke`;
  }

  remove(id: number) {
    return `This action removes a #${id} joke`;
  }
}
