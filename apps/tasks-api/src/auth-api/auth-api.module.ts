import { Module } from '@nestjs/common';
import { AuthApiController } from './auth-api.controller';
import { AuthModule } from 'auth';

@Module({
  imports: [AuthModule],
  controllers: [AuthApiController],
})
export class AuthApiModule {}
