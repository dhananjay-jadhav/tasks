import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './login.input';
import { UsersService } from '@tasks/users';
import { UserEntity } from '@tasks/sql-db';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(input: LoginInput, response: Response): Promise<Response> {
    const user = await this.userService.findOrFailByEmail(input.email);
    await this.validateUser(input, user);
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    response.cookie('Authorization', token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    return response;
  }

  async validateUser(input: LoginInput, user: UserEntity) {
    const authenticated = await compare(input.password, user.password);

    if (!authenticated) {
      const errorMessage = `Login failed for the user: ${input.email}`;
      this.logger.error(errorMessage);
      throw new UnauthorizedException(errorMessage);
    }
  }
}
