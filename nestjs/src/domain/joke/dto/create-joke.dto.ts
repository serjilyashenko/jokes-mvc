import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJokeDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
