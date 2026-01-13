import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokeViewController } from '../../presentation/joke-view.controller';
import { JokeService } from './joke.service';
import { JokeEntity } from '../../infrastructure/reppositories/joke/entities/joke.entity';
import { JokeTypeormRepository } from '../../infrastructure/reppositories/joke/joke.typeorm.repository';
import { JokeMapper } from './mappers/joke.mapper';
import { IcanhazdadJokeModule } from '../../infrastructure/client/icanhazdad/icanhazdad-joke.module';
import { IJokeRepositoryToken } from '../../domain/joke/joke.repository.interface';
import { JokeApiController } from '../../presentation/joke-api.controller';
import { JwtAuthModule } from '../../infrastructure/jwt-auth/jwt-auth.module';
import { UserEntity } from '../../infrastructure/reppositories/user/entities/user.entity';
import { IUserRepositoryToken } from '../../domain/user/user.repository.interface';
import { UserTypeormRepository } from '../../infrastructure/reppositories/user/user.typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([JokeEntity, UserEntity]),
    JwtAuthModule,
    IcanhazdadJokeModule,
  ],
  providers: [
    JokeService,
    JokeMapper,
    {
      provide: IJokeRepositoryToken,
      useClass: JokeTypeormRepository,
    },
    {
      provide: IUserRepositoryToken,
      useClass: UserTypeormRepository,
    },
  ],
  controllers: [JokeViewController, JokeApiController],
})
export class JokeModule {}
