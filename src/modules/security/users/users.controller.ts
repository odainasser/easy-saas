import { Controller, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiTags,
  ApiConsumes,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto } from '../../../shared/dtos/create-user.dto';
import { UpdateUserDto } from '../../../shared/dtos/update-user.dto';
import { UpdateUserPasswordDto } from '../../../shared/dtos/update-user-password.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneByID(id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Update a user by ID' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Put(':id/password')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Update a user password by ID' })
  async updatePassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const { password, confirmPassword } = updateUserPasswordDto;
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (password.length < 8 || password.length > 20) {
      throw new Error('Password must be between 8 and 20 characters');
    }
    return this.usersService.updatePassword(id, password);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
