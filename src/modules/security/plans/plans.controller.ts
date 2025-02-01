import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { Plan } from '../../../shared/entities/plan.entity';
import { CreatePlanDto } from '../../../shared/dtos/plans/create-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @ApiOperation({ summary: 'Create a new plan' })
  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  create(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
    return this.plansService.create(createPlanDto);
  }

  @ApiOperation({ summary: 'Get all plans' })
  @Get()
  findAll(): Promise<Plan[]> {
    return this.plansService.findAll();
  }

  @ApiOperation({ summary: 'Get a plan by ID' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Plan> {
    return this.plansService.findOne(id);
  }
}
