import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

class CustomConfigService {
  private env: { [key: string]: string | undefined };

  constructor(env: { [key: string]: string | undefined } = process.env) {
    this.env = env;
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]): this {
    keys.forEach((key) => this.getValue(key, true));
    return this;
  }

  public getPort(): number {
    return parseInt(this.getValue('PORT', true), 10);
  }

  public isProduction(): boolean {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getTypeOrmConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: ['dist/db/entities/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['dist/db/migrations/*.js'],
      ssl: this.isProduction() ? { rejectUnauthorized: false } : false,
      synchronize: false,
    };
  }

  public getRedisConfig() {
    return {
      host: this.getValue('REDIS_HOST'),
      port: parseInt(this.getValue('REDIS_PORT'), 10),
      password: this.getValue('REDIS_PASSWORD'),
      ttl: parseInt(this.getValue('CACHE_TTL') || '3600', 10),
    };
  }
}

const configService = new CustomConfigService().ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'REDIS_HOST',
  'REDIS_PORT',
  'REDIS_PASSWORD',
]);

export { configService, CustomConfigService };
