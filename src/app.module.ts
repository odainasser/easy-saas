import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UsersModule } from './modules/security/users/users.module';
import { CalendarModule } from './modules/common/calendar/calendar.module';
import { NotificationsModule } from './modules/common/notifications/notifications.module';
import { TenantsModule } from './modules/security/tenants/tenants.module';
import { RolesModule } from './modules/security/roles/roles.module';
import { ActivitiesModule } from './modules/security/activities/activities.module';
import { AttachmentsModule } from './modules/common/attachments/attachments.module';
import { SettingsModule } from './modules/common/settings/settings.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
