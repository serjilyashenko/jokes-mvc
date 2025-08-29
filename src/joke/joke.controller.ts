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
} from '@nestjs/common';
import { JokeService } from './joke.service';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { CreateJokeDto } from './dto/create-joke.dto';

@Controller('jokes')
export class JokeController {
  constructor(private readonly jokeService: JokeService) {}

  private readonly JOKE_MOCK =
    "Why don't scientists trust atoms? Because they make up everything!";

  @Get('new')
  @Render('joke-create')
  showCreateView() {
    // TODO: get random joke from a service
    // FIXME: Which service? JokeService or external API service?
    return { joke: this.JOKE_MOCK };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createJokeDto: CreateJokeDto) {
    return this.jokeService.create(createJokeDto);
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
    return this.jokeService.remove(+id);
  }
}
