import { Module } from '@nestjs/common';

import { PubsubPocService } from './pubsub-poc.service';

import { PubsubPocController } from './pubsub-poc.controller';

import { GcpPubsubModule } from '../../plugins/gcp-pubsub/gcp-pubsub.module';

@Module({
  imports: [GcpPubsubModule],
  providers: [PubsubPocService],
  controllers: [PubsubPocController],
})
export class PubsubPocModule {}
