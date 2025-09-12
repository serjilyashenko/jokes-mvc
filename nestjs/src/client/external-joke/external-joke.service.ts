import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { IExternalJokeService } from '../../domain/joke/interfaces/external-joke.service.interface';
import { ExternalJokeDto } from './dto/external-joke.dto';
import { firstValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ExternalJokeEntity } from './entities/external-joke.entity';

@Injectable()
export class IcanhazdadJokeJokeService implements IExternalJokeService {
  private readonly API_URL = 'https://icanhazdadjoke.com/';

  private readonly logger = new Logger(IcanhazdadJokeJokeService.name);

  constructor(private readonly httpService: HttpService) {}

  async getJoke(): Promise<ExternalJokeEntity | null> {
    try {
      const observable = this.httpService.get<unknown>(this.API_URL, {
        headers: { Accept: 'application/json' },
      });
      const externalJokePojo = (await firstValueFrom(observable)).data;
      const externalJokeDto = plainToInstance(
        ExternalJokeDto,
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
