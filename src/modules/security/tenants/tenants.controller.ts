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
  ApiOperation,
  ApiConsumes,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from '../../../shared/dtos/tenants/create-tenant.dto';
import { UpdateTenantDto } from '../../../shared/dtos/tenants/update-tenant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateTenantUserDto } from '../../../shared/dtos/tenants/update-tenant-user.dto';
import { CreateSubscriptionDto } from '../../../shared/dtos/subscriptions/create-subscription.dto';
import { UpdateSubscriptionDto } from '../../../shared/dtos/subscriptions/update-subscription.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('tenants')
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiConsumes('application/x-www-form-urlencoded')
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all tenants' })
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single tenant by ID' })
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing tenant' })
  @ApiConsumes('application/x-www-form-urlencoded')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Put(':tenantId/users/:userId')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation({ summary: 'Add a user to a tenant' })
  addUserToTenant(
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
    @Body() updateTenantUserDto: UpdateTenantUserDto,
  ) {
    return this.tenantsService.addUserToTenant(
      tenantId,
      userId,
      updateTenantUserDto.type,
    );
  }

  @Delete(':tenantId/users/:userId')
  @ApiOperation({ summary: 'Remove a user from a tenant' })
  removeUserFromTenant(
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
  ) {
    return this.tenantsService.removeUserFromTenant(tenantId, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tenant by ID' })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }

  @Post(':tenantId/subscription')
  @ApiOperation({ summary: 'Create subscription for a tenant' })
  @ApiConsumes('application/x-www-form-urlencoded')
  upgradeSubscription(
    @Param('tenantId') tenantId: string,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.tenantsService.createSubscription(
      tenantId,
      createSubscriptionDto,
    );
  }

  @Put(':tenantId/subscription')
  @ApiOperation({ summary: 'Update subscription plan for a tenant' })
  @ApiConsumes('application/x-www-form-urlencoded')
  updateSubscription(
    @Param('tenantId') tenantId: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.tenantsService.updateSubscription(
      tenantId,
      updateSubscriptionDto.planId,
    );
  }
}
