import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from '@tasks/users';
import { CreateUserInput } from './dtos/create-user.type';
import { User } from '../../../../libs/users/src/lib/user.type';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    try {
      const userEntity = await this.usersService.findOneOrFail(id);
      return {
        id: userEntity.id,
        email: userEntity.email,
        username: userEntity.username,
      };
    } catch (err) {
      this.logger.error(err);
      throw new Error(`Did not found the user : ${id}`);
    }
  }

  @Post()
  async createUser(@Body() input: CreateUserInput): Promise<User> {
    try {
      const userEntity = await this.usersService.createUser({
        ...input,
      });
      return {
        id: userEntity.id,
        email: userEntity.email,
        username: userEntity.username,
      };
    } catch (err) {
      this.logger.error('Error creating user', err);
      throw err;
    }
  }

  @Put(':id')
  updateUser() {}
}
