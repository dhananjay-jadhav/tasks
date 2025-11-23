import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersApiModule } from '../users/users-api.module';
import { AuthDbModule } from '@tasks/sql-db';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthDbModule,
    UsersApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
