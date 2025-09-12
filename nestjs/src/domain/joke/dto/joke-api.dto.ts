import { ApiProperty } from '@nestjs/swagger';

export class JokeApiDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;
}
