import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TenantService } from '../tenant/tenant.service';
import { LoginDto } from './dtos/login.dto';
import { TenantLoginDto } from './dtos/tenant-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tenantService: TenantService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateTenant(email: string, password: string): Promise<any> {
    const tenant = await this.tenantService.findOneByEmail(email);
    if (tenant && (await bcrypt.compare(password, tenant.password))) {
      const { password, ...result } = tenant;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id, type: 'user' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginTenant(tenantLoginDto: TenantLoginDto): Promise<any> {
    const { email, password } = tenantLoginDto;
    const tenant = await this.validateTenant(email, password);
    if (!tenant) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: tenant.email, sub: tenant.id, type: 'tenant' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
