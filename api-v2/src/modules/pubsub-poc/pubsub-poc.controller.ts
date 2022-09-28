import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { PubsubPocService } from './pubsub-poc.service';

import { PublishInput } from './dto/publish-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Controller('pubsub-poc')
export class PubsubPocController {
  constructor(private readonly service: PubsubPocService) {}

  @Post('/publish')
  public async publish(@Body() input: PublishInput) {
    return this.service.publish(input);
  }

  @Post('/consume')
  public async consume(@Body() input: any) {
    return this.service.consume(input);
  }
}
