import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IExternalJokeService } from '../../../domain/external-joke/external-joke.service.interface';
import { IcanhazdadJokeDto } from './dto/icanhazdad-joke.dto';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ExternalJokeEntity } from './entitites/external-joke.entity';

@Injectable()
export class IcanhazdadJokeService implements IExternalJokeService {
  private readonly API_URL = 'https://icanhazdadjoke.com/';

  private readonly logger = new Logger(IcanhazdadJokeService.name);

  constructor(private readonly httpService: HttpService) {}

  async getJoke(): Promise<ExternalJokeEntity | null> {
    try {
      const observable = this.httpService.get<unknown>(this.API_URL, {
        headers: { Accept: 'application/json' },
      });
      const externalJokePojo = (await firstValueFrom(observable)).data;
      const externalJokeDto = plainToInstance(
        IcanhazdadJokeDto,
        externalJokePojo,
      );
      await validateOrReject(externalJokeDto);
      return { joke: externalJokeDto.joke };
    } catch (e) {
      this.logger.error('Failed to fetch joke from external API', e);
      return null;
    }
  }
}
