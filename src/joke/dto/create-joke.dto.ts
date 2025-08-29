import { IsNotEmpty } from 'class-validator';

export class CreateJokeDto {
  @IsNotEmpty()
  content: string;
}
