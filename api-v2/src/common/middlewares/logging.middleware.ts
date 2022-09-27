import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    res.on('finish', () => {
      Logger.log({
        message: 'request logged',
        stt: 'undetermined',
        context: LoggingMiddleware.name,
        functionName: 'use',
        data: {
          requestedRoute: req.originalUrl,
          method: req.method,
          status: res.statusCode,
        },
      });
    });

    next();
  }
}
