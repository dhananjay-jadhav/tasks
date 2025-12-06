import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersApiModule } from '../users/users-api.module';
import { AuthDbModule } from '@tasks/sql-db';
import { AuthApiModule } from '../auth-api/auth-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    AuthDbModule,
    UsersApiModule,
    AuthApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
