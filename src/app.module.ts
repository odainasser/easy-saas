import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { TenantsModule } from './modules/security/tenants/tenants.module';
import { RolesModule } from './modules/security/roles/roles.module';
import { ActivitiesModule } from './modules/security/activities/activities.module';
import { UsersModule } from './modules/security/users/users.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SettingsModule } from './modules/property/settings/settings.module';
import { AuthModule } from './modules/security/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    CalendarModule,
    NotificationsModule,
    TenantsModule,
    RolesModule,
    ActivitiesModule,
    AttachmentsModule,
    SettingsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
