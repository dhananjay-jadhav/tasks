import { Body, Controller, Post, Res } from '@nestjs/common';
import {AuthService , IsGlobal, LoginInput,  } from 'auth';
import type { Response } from 'express';

@Controller('auth-api')
export class AuthApiController {
  constructor(private readonly authService: AuthService) {}

  @IsGlobal()
  @Post()
  login(@Body() input: LoginInput , @Res() response: Response) {
    return this.authService.login(input, response);
  }
}
