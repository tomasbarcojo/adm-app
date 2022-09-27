import { PublishOptions } from '@google-cloud/pubsub/build/src/topic';

export class PublishMessageInput {
  readonly topic: string;

  readonly data:
    | string
    | Uint8Array
    | number[]
    | ArrayBuffer
    | SharedArrayBuffer;

  readonly attributes: { [key: string]: string };

  readonly encoding?: BufferEncoding;

  readonly options?: PublishOptions;

  readonly orderingKey?: string;
}
