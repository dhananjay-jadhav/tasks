import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {}

  @Get(':id')
  getUser() {}

  @Post()
  createUser() {}

  @Put(':id')
  updateUser() {}
}
