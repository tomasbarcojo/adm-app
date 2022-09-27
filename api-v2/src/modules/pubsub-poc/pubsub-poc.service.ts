import * as path from 'path';
import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';

import { GcpPubsubService } from '../../plugins/gcp-pubsub/gcp-pubsub.service';

import { PublishInput } from './dto/publish-input.dto';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

@Injectable()
export class PubsubPocService {
  constructor(private readonly gcpPubsubService: GcpPubsubService) {
    const dataFilePath = path.resolve(__dirname, './data');
    if (!fs.existsSync(dataFilePath)) {
      fs.mkdirSync(dataFilePath);
    }
  }

  public async publish(input: PublishInput) {
    const data = {
      ...input,
      timestamp: new Date().toISOString(),
      process: 'PUSBSUB_POC',
    };

    Logger.log({
      stt: 'undetermined',
      context: PubsubPocService.name,
      functionName: 'publish',
      message: 'publishing...',
      data,
    });

    const result = await this.gcpPubsubService.publishMessage({
      topic: 'BETA_poc_pubsub',
      data: JSON.stringify(data),
      attributes: {},
      orderingKey: 'PUSBSUB_POC',
      options: {
        messageOrdering: true,
      },
    });

    Logger.log({
      stt: 'undetermined',
      context: PubsubPocService.name,
      functionName: 'publish',
      message: 'published...',
      data: {
        result,
      },
    });

    return result;
  }

  public async consume(input: any) {
    const {
      message: { messageId, data },
    } = input;

    // await delay(5000);

    const message = JSON.parse(Buffer.from(data, 'base64').toString('utf8'));

    const messagesFilePath = path.resolve(__dirname, './data/messages.txt');

    if (!fs.existsSync(messagesFilePath)) {
      fs.writeFileSync(messagesFilePath, '');
    }

    fs.appendFileSync(messagesFilePath, `${messageId}\n`);

    Logger.log({
      stt: 'undetermined',
      context: PubsubPocService.name,
      functionName: 'consume',
      message: `messageId ${messageId}`,
      data: {
        consumed: message,
      },
    });

    return message;
  }
}
