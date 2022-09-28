import * as winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

interface LogInput {
  readonly stt: string;

  readonly functionName: string;

  readonly message: string;

  readonly storeId?: string;

  readonly responseCode?: string;

  readonly data?: any;
}

interface ErrorInput {
  readonly stt: string;

  readonly functionName: string;

  readonly message: string;

  readonly error: Error;

  readonly storeId?: string;

  readonly responseCode?: string;

  readonly data?: any;
}

export class Logger {
  private static logger: winston.Logger;

  public static _initialize(serviceName: string) {
    const loggingWinston = new LoggingWinston({
      serviceContext: {
        service: serviceName,
      },
    });

    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        // Add Stackdriver Logging
        loggingWinston,
      ],
    });
  }

  public static log(input: LogInput) {
    const { message, ...res } = input;

    this.logger.info(message, res);
  }

  public static error(input: ErrorInput) {
    const { message, error, ...res } = input;

    const errorObj = Object.getOwnPropertyNames(error).reduce((acc, key) => ({ ...acc, [key]: error[key] }), {});

    this.logger.error(message, {
      ...res,
      error: errorObj,
    });
  }

  public static warn(input: LogInput) {
    const { message, ...res } = input;

    this.logger.warn(message, res);
  }
}
