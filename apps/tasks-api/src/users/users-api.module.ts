import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule } from '@tasks/users';
import { IsUserExistConstraint } from './decorators/user-exist.decorator';

@Module({
  imports: [UsersModule],
  providers: [IsUserExistConstraint],
  controllers: [UsersController],
})
export class UsersApiModule {}
