// import { Controller, Get } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator } from '@nestjs/terminus';

// @Controller('health')
// export class HealthController {
//   constructor(
//     private health: HealthCheckService,
//     private http: HttpHealthIndicator,
//     private db: TypeOrmHealthIndicator,
//     private configService: ConfigService,
//   ) {}

//   @Get()
//   @HealthCheck()
//   check() {
//     // getting the port env var
//     const BASE_URL = this.configService.get<string>('config.app.baseUrl');

//     return this.health.check([
//       () => this.http.pingCheck('nestjs-api-template', BASE_URL),
//       () => this.db.pingCheck('database'),
//     ]);
//   }
// }
