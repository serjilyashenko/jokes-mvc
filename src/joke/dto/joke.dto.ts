import { IsOptional, IsNotEmpty } from 'class-validator';

export class JokeDto {
  @IsOptional()
  id: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  isDeleted: boolean;
}
