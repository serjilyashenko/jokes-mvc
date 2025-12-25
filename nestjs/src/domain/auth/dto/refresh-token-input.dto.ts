import { IsNotEmpty } from 'class-validator';

export class RefreshTokenInputDto {
  @IsNotEmpty()
  refreshToken: string;
}
