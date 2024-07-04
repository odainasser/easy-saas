import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './modules/security/roles/roles.module';
import { ActivitiesModule } from './modules/security/activities/activities.module';
import { UsersModule } from './modules/security/users/users.module';
import { AttachmentsModule } from './modules/core/attachments/attachments.module';
import { CalendarModule } from './modules/system/calendar/calendar.module';
import { NotificationsModule } from './modules/core/notifications/notifications.module';
import { SettingsModule } from './modules/system/settings/settings.module';
import { AuthModule } from './modules/security/auth/auth.module';
import { TenantModule } from './modules/security/tenant/tenant.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
      auth_pass: process.env.REDIS_PASSWORD,
      ttl: parseInt(process.env.CACHE_TTL, 10) || 3600,
    }),
    UsersModule,
    CalendarModule,
    NotificationsModule,
    RolesModule,
    ActivitiesModule,
    AttachmentsModule,
    SettingsModule,
    AuthModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
