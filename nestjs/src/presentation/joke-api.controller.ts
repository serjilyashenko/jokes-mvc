import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JokeService } from '../application/joke/joke.service';
import { JokeApiDto } from '../application/joke/dto/joke-api.dto';
import { UpdateJokeDto } from '../application/joke/dto/update-joke.dto';
import { CreateJokeDto } from '../application/joke/dto/create-joke.dto';
import { ValidateIntPipe } from './pipes/ValidateIntPipe';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuth } from '../infrastructure/jwt-auth/decorators/jwt-auth.decorator';
import { JwtIdentity } from '../infrastructure/jwt-auth/decorators/jwt-identity.decorator';
import { AuthIdentity } from '../infrastructure/jwt-auth/types/auth-identity.type';

@Controller('api/jokes')
@JwtAuth()
export class JokeApiController {
  constructor(private readonly jokeService: JokeService) {}

  @Post()
  @ApiOkResponse({ type: JokeApiDto })
  async create(
    @JwtIdentity() identity: AuthIdentity,
    @Body() createJokeDto: CreateJokeDto,
  ): Promise<JokeApiDto> {
    return await this.jokeService.create(identity.sub, createJokeDto);
  }

  @Get()
  @ApiOkResponse({ type: JokeApiDto, isArray: true })
  async findAll(@JwtIdentity() identity: AuthIdentity): Promise<JokeApiDto[]> {
    return await this.jokeService.findAllApiDto(identity.sub);
  }

  @Get(':id')
  @ApiOkResponse({ type: JokeApiDto })
  async findOne(
    @Param('id', ValidateIntPipe) jokeId: string,
    @JwtIdentity() identity: AuthIdentity,
  ): Promise<JokeApiDto> {
    const jokeApiDto = await this.jokeService.findOne(identity.sub, jokeId);
    if (!jokeApiDto) {
      throw new NotFoundException();
    }
    return jokeApiDto;
  }

  @Patch(':id')
  @ApiOkResponse({ type: JokeApiDto })
  async update(
    @Param('id', ValidateIntPipe) jokeId: string,
    @JwtIdentity() identity: AuthIdentity,
    @Body() updateJokeDto: UpdateJokeDto,
  ): Promise<JokeApiDto> {
    const jokeApiDto = await this.jokeService.update(
      identity.sub,
      jokeId,
      updateJokeDto,
    );
    if (!jokeApiDto) {
      throw new NotFoundException();
    }
    return jokeApiDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  remove(
    @Param('id', ValidateIntPipe) jokeId: string,
    @JwtIdentity() identity: AuthIdentity,
  ) {
    return this.jokeService.remove(identity.sub, jokeId);
  }
}
