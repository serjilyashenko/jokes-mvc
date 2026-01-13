import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Redirect,
  HttpStatus,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { JokeService } from '../application/joke/joke.service';
import { CreateJokeDto } from '../application/joke/dto/create-joke.dto';
import { JokeViewDto } from '../application/joke/dto/joke-view.dto';
import { CreateJokeViewDto } from '../application/joke/dto/create-joke-view.dto';

@Controller('jokes')
@ApiExcludeController()
export class JokeViewController {
  constructor(private readonly jokeService: JokeService) {}

  @Get('new')
  @Render('joke-create')
  async showCreateView(): Promise<CreateJokeViewDto> {
    return await this.jokeService.getCreateViewDto();
  }

  @Post('new')
  @Redirect('/jokes', HttpStatus.SEE_OTHER)
  async create(@Body() createJokeDto: CreateJokeDto) {
    // TODO: Replace with actual Cookie Identity Decorator
    const userId = '2';
    await this.jokeService.create(userId, createJokeDto);
    return;
  }

  @Get()
  @Render('jokes')
  async showAllView(): Promise<{ jokes: Array<JokeViewDto> }> {
    const jokeDtoList = await this.jokeService.findAllViewDto();
    return { jokes: jokeDtoList };
  }
}
