import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateJokeDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;
}
