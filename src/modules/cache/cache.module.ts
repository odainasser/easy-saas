import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';

dotenv.config();

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
      auth_pass: process.env.REDIS_PASSWORD,
      ttl: parseInt(process.env.CACHE_TTL, 10) || 3600,
    }),
  ],
  exports: [CacheModule],
})
export class CacheGlobalModule {}
