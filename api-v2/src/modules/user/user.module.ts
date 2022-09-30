import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from '../../config/app.config';

import { User } from './user.entity';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [ConfigModule.forFeature(appConfig), TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
