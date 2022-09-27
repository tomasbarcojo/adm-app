import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { name: 'chiper', message: 'Hello World!' };
  }
}
