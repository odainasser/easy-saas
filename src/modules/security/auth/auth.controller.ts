import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../../shared/dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateUserDto } from '../../../shared/dtos/users/update-user.dto';
import { UpdateUserPasswordDto } from '../../../shared/dtos/users/update-user-password.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { UsersService } from '../users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({ status: 201, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req) {
    const { password, ...userWithoutPassword } = req.user;
    return userWithoutPassword;
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.update(userId, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user password' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 200,
    description: 'User password updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updatePassword(
    @Request() req,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const userId = req.user.id;
    const { password, confirmPassword } = updateUserPasswordDto;
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (password.length < 8 || password.length > 20) {
      throw new Error('Password must be between 8 and 20 characters');
    }
    return this.usersService.updatePassword(userId, password);
  }
}
