import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { TenantLoginDto } from './dtos/tenant-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/login')
  @ApiOperation({ summary: 'User login' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({ status: 201, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('tenant/login')
  @ApiOperation({ summary: 'Tenant login' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({ status: 201, description: 'Tenant successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async loginTenant(@Body() tenantLoginDto: TenantLoginDto) {
    return this.authService.loginTenant(tenantLoginDto);
  }
}
