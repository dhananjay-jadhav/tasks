import { Body, Controller, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '@tasks/users';
import { CreateUser } from './dtos/createUser.dtos';
import { User } from './dtos/user.dtos';

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
        ...userEntity
      }
    } catch(err){
      this.logger.error(err);
      throw new Error(`Did not found the user : ${id}`);
    }
  }

  @Post()
  async createUser(@Body('createUser') createUser: CreateUser): Promise<User> {
    try {
      const userEntity = await  this.usersService.createUser({
         ...createUser
      });
      return {
        ...userEntity
      }
    } catch(err){
      this.logger.error('Error creating user', err);
      throw err;
    }

  }

  @Put(':id')
  updateUser() {}
}
