import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../../../shared/entities/plan.entity';
import { CreatePlanDto } from '../../../shared/dtos/plans/create-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly plansRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = this.plansRepository.create(createPlanDto);
    return this.plansRepository.save(plan);
  }

  findAll(): Promise<Plan[]> {
    return this.plansRepository.find();
  }

  findOne(id: string): Promise<Plan> {
    return this.plansRepository.findOne({ where: { id } });
  }
}
