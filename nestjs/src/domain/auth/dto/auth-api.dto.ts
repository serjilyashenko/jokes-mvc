import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches, MinLength } from 'class-validator';

export class AuthApiDto {
  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @Length(4, 64)
  @Matches(/^(?=.*[A-Za-z])(?=.*(\d|[^A-Za-z0-9])).+$/, {
    message: 'password must include at least one number or special character.',
  })
  password: string;
}
