import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from '../../../shared/entities/role.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateRoleDto } from '../../../shared/dtos/roles/create-role.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Create a new role' })
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Update a role by ID' })
  update(@Param('id') id: string, @Body() role: Role): Promise<Role> {
    return this.rolesService.update(id, role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
