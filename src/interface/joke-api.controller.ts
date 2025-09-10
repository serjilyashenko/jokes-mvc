import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JokeService } from '../domain/joke/joke.service';
import { JokeApiDto } from '../domain/joke/dto/joke-api.dto';
import { UpdateJokeDto } from '../domain/joke/dto/update-joke.dto';
import { CreateJokeDto } from '../domain/joke/dto/create-joke.dto';
import { ValidateIntPipe } from './pipes/ValidateIntPipe';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('api/jokes')
export class JokeApiController {
  constructor(private readonly jokeService: JokeService) {}

  @Post()
  @ApiOkResponse({ type: JokeApiDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createJokeDto: CreateJokeDto): Promise<JokeApiDto> {
    return await this.jokeService.create(createJokeDto);
  }

  @Get()
  @ApiOkResponse({ type: JokeApiDto, isArray: true })
  async findAll(): Promise<JokeApiDto[]> {
    return await this.jokeService.findAllApiDto();
  }

  @Get(':id')
  @ApiOkResponse({ type: JokeApiDto })
  async findOne(@Param('id', ValidateIntPipe) id: string): Promise<JokeApiDto> {
    const jokeApiDto = await this.jokeService.findOne(id);
    if (!jokeApiDto) {
      throw new NotFoundException();
    }
    return jokeApiDto;
  }

  @Patch(':id')
  @ApiOkResponse({ type: JokeApiDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id', ValidateIntPipe) id: string,
    @Body() updateJokeDto: UpdateJokeDto,
  ): Promise<JokeApiDto> {
    const jokeApiDto = await this.jokeService.update(id, updateJokeDto);
    if (!jokeApiDto) {
      throw new NotFoundException();
    }
    return jokeApiDto;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  remove(@Param('id', ValidateIntPipe) id: string) {
    return this.jokeService.remove(id);
  }
}
