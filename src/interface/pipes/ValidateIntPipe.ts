import { Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';

@Injectable()
export class ValidateIntPipe implements PipeTransform<string, Promise<string>> {
  private readonly parseIntPipe = new ParseIntPipe();

  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    await this.parseIntPipe.transform(value, metadata); // throws an error if not a valid integer

    return value;
  }
}
