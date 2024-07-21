import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { TenantService } from '../../tenant/tenant.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly tenantService: TenantService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mnzWNzhBorUia',
    });
  }

  async validate(payload: any) {
    if (payload.type === 'user') {
      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new Error('Unauthorized');
      }
      return { ...user, type: 'user' };
    } else if (payload.type === 'tenant') {
      const tenant = await this.tenantService.findOne(payload.sub);
      if (!tenant) {
        throw new Error('Unauthorized');
      }
      return { ...tenant, type: 'tenant' };
    } else {
      throw new Error('Unauthorized');
    }
  }
}
