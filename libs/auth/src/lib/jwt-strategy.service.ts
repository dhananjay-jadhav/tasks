import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoginInput } from './login.input';
import { User, UsersService } from '@tasks/users';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategyService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(input: LoginInput): Promise<User> {
    try {
      const user = await this.userService.findOrFailByEmail(input.email);
      if (user?.id) {
        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      }
      throw new UnauthorizedException();
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException();
    }
  }
}
