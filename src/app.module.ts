import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        auth_pass: configService.get<string>('REDIS_PASSWORD'),
        ttl: configService.get<number>('CACHE_TTL', 3600),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CalendarModule,
    NotificationsModule,
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
