import { Injectable } from '@nestjs/common';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { CreateJokeDto } from './dto/create-joke.dto';

@Injectable()
export class JokeService {
  create(createJokeDto: CreateJokeDto) {
    return 'This action adds a new joke';
  }

  findAll() {
    return `This action returns all joke`;
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
