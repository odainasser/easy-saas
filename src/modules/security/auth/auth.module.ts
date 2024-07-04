import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../db/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TenantModule } from '../tenant/tenant.module';
import { Tenant } from '../../../db/entities/tenant.entity';

@Module({
  imports: [
    UsersModule,
    TenantModule,
    TypeOrmModule.forFeature([User, Tenant]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mnzWNzhBorUia',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
