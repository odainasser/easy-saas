import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UsersModule } from './modules/security/users/users.module';
import { AuthModule } from './modules/security/auth/auth.module';
import { CalendarModule } from './modules/common/calendar/calendar.module';
import { NotificationsModule } from './modules/common/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    CalendarModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
