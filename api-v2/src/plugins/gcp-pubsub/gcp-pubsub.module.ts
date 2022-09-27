import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from '../../config/app.config';

import { GcpPubsubService } from './gcp-pubsub.service';

@Module({
  imports: [ConfigModule.forFeature(appConfig)],
  providers: [GcpPubsubService],
  exports: [GcpPubsubService],
})
export class GcpPubsubModule {}
