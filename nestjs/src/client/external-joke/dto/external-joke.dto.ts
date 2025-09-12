import { IsNotEmpty, IsString } from 'class-validator';

export class ExternalJokeDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  joke: string;

  status: number;
}
