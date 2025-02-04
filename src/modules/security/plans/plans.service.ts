import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../../../shared/entities/plan.entity';
import { CreatePlanDto } from '../../../shared/dtos/plans/create-plan.dto';
import { UpdatePlanDto } from '../../../shared/dtos/plans/update-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly plansRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    try {
      const plan = this.plansRepository.create(createPlanDto);
      return await this.plansRepository.save(plan);
    } catch (error) {
      throw new Error(`Error creating plan: ${error.message}`);
    }
  }

  async findAll(): Promise<Plan[]> {
    try {
      return await this.plansRepository.find({ relations: ['subscriptions'] });
    } catch (error) {
      throw new Error(`Error finding plans: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Plan> {
    try {
      return await this.plansRepository.findOne({
        where: { id },
        relations: ['subscriptions'],
      });
    } catch (error) {
      throw new Error(`Error finding plan with id ${id}: ${error.message}`);
    }
  }

  async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    try {
      await this.plansRepository.update(id, updatePlanDto);
      return await this.findOne(id);
    } catch (error) {
      throw new Error(`Error updating plan with id ${id}: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.plansRepository.softDelete(id);
    } catch (error) {
      throw new Error(
        `Error soft deleting plan with id ${id}: ${error.message}`,
      );
    }
  }
}
