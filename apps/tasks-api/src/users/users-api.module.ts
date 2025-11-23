import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule } from '@tasks/users';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
})
export class UsersApiModule {}
