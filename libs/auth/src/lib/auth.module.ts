import { Module } from '@nestjs/common';
import { JwtStrategyService } from './jwt-strategy.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@tasks/users';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: '10 Minutes',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategyService, AuthService],
  exports: [],
})
export class AuthModule {}
