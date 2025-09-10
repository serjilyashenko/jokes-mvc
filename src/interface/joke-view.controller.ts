import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  ValidationPipe,
  UsePipes,
  Redirect,
  HttpStatus,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { JokeService } from '../domain/joke/joke.service';
import { CreateJokeDto } from '../domain/joke/dto/create-joke.dto';
import { JokeViewDto } from '../domain/joke/dto/joke-view.dto';
import { CreateJokeViewDto } from '../domain/joke/dto/create-joke-view.dto';
import { ValidateIntPipe } from './pipes/ValidateIntPipe';

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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Redirect('/jokes', HttpStatus.SEE_OTHER)
  async create(@Body() createJokeDto: CreateJokeDto) {
    await this.jokeService.create(createJokeDto);
    return;
  }

  @Get()
  @Render('jokes')
  async showAllView(): Promise<{ jokes: Array<JokeViewDto> }> {
    const jokeDtoList = await this.jokeService.findAllViewDto();
    return { jokes: jokeDtoList };
  }

  @Delete(':id')
  remove(@Param('id', ValidateIntPipe) id: string) {
    return this.jokeService.remove(id);
  }
}
