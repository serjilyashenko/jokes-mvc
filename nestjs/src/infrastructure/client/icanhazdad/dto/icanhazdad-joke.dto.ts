import { IsNotEmpty, IsString } from 'class-validator';

export class IcanhazdadJokeDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  joke: string;
}
