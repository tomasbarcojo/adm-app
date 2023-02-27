import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { name: 'Activa Adm', message: 'Hello World!' };
  }
}
