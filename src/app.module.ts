import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/security/users/users.module';
import { AuthModule } from './modules/security/auth/auth.module';
import { RolesModule } from './modules/security/roles/roles.module';
import { TenantsModule } from './modules/security/tenants/tenants.module';

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
    // CacheModule.register({
    //   store: redisStore,
    //   host: process.env.REDIS_HOST,
    //   port: parseInt(process.env.REDIS_PORT, 10),
    //   auth_pass: process.env.REDIS_PASSWORD,
    //   ttl: parseInt(process.env.CACHE_TTL, 10) || 3600,
    // }),
    AuthModule,
    TenantsModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
