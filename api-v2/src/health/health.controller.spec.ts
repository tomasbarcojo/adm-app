// import * as path from 'path';

// import { ConfigModule } from '@nestjs/config';
// import { HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
// import { Test, TestingModule } from '@nestjs/testing';

// import appConfig from '../config/app.config';
// import appConfigSchema from '../config/app.schema';

// import { HealthController } from './health.controller';

// const envPath = path.resolve(__dirname, '../../.env.test');

// describe('HealthController', () => {
//   let controller: HealthController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot({
//           load: [appConfig],
//           envFilePath: envPath,
//           validationSchema: appConfigSchema,
//         }),
//       ],
//       controllers: [HealthController],
//       providers: [
//         {
//           provide: HealthCheckService,
//           useValue: HealthCheckService,
//         },
//         {
//           provide: HttpHealthIndicator,
//           useClass: HttpHealthIndicator,
//         },
//         {
//           provide: TypeOrmHealthIndicator,
//           useClass: TypeOrmHealthIndicator,
//         },
//       ],
//     }).compile();

//     controller = module.get<HealthController>(HealthController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
