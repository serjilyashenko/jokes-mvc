import { PartialType } from '@nestjs/mapped-types';
import { CreateJokeDto } from './create-joke.dto';

export class UpdateJokeDto extends PartialType(CreateJokeDto) {}
