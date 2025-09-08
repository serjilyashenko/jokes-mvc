import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  ValidationPipe,
  UsePipes,
  Redirect,
  HttpStatus,
} from '@nestjs/common';
import { JokeService } from '../joke.service';
import { UpdateJokeDto } from '../dto/update-joke.dto';
import { CreateJokeDto } from '../dto/create-joke.dto';
import { JokeViewDto } from '../dto/joke-view.dto';
import { CreateJokeViewDto } from '../dto/create-joke-view.dto';

@Controller('jokes')
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

  @Get()
  findAll() {
    return this.jokeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jokeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJokeDto: UpdateJokeDto) {
    return this.jokeService.update(+id, updateJokeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jokeService.remove(id);
  }
}
