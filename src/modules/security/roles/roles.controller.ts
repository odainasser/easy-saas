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
import { UpdateRoleDto } from '../../../shared/dtos/roles/update-role.dto';

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
    return this.rolesService.findOneById(id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Update a role by ID' })
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by ID' })
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
