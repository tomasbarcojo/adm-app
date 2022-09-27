import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { ConfigType } from '@nestjs/config';
import { nanoid } from 'nanoid';

import appConfig from '../../config/app.config';

import { PublishMessageInput } from './dto/publish-message-input.dto';

@Injectable()
export class GcpPubsubService {
  private pubSubLib: PubSub;

  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {
    const {
      gcp: { credentials },
    } = this.appConfiguration;

    /*
    this.pubSubLib = new PubSub({
      servicePath: credentials,
    });
    */

    this.pubSubLib = new PubSub();
  }

  public async publishMessage(input: PublishMessageInput) {
    let dataBuffer: Buffer = undefined;

    const { data, encoding } = input;

    if (typeof data === 'string' && encoding) {
      dataBuffer = Buffer.from(data as string, encoding);
    } else if (Array.isArray(data)) {
      dataBuffer = Buffer.from(data as number[]);
    } else if (data instanceof ArrayBuffer) {
      dataBuffer = Buffer.from(data as ArrayBuffer);
    } else if (data instanceof SharedArrayBuffer) {
      dataBuffer = Buffer.from(data as SharedArrayBuffer);
    } else if (data instanceof Uint8Array) {
      dataBuffer = Buffer.from(data as Uint8Array);
    } else {
      dataBuffer = Buffer.from(data as string);
    }

    const { topic, options, attributes, orderingKey } = input;

    return this.pubSubLib.topic(topic, options).publishMessage({
      attributes,
      data: dataBuffer,
      orderingKey,
    });
  }
}
