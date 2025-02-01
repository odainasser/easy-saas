import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../shared/entities/role.entity';
import { CreateRoleDto } from 'src/shared/dtos/roles/create-role.dto';
import { UpdateRoleDto } from 'src/shared/dtos/roles/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new Error(`Failed to find roles: ${error.message}`);
    }
  }

  async findOneById(id: string): Promise<Role> {
    try {
      return await this.roleRepository.findOne({
        where: { id },
        relations: ['users'],
      });
    } catch (error) {
      throw new Error(`Failed to find role by ID: ${error.message}`);
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      return await this.roleRepository.save(createRoleDto);
    } catch (error) {
      throw new Error(`Failed to create role: ${error.message}`);
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      await this.roleRepository.update(id, updateRoleDto);
      return await this.roleRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to update role: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.roleRepository.softDelete(id);
    } catch (error) {
      throw new Error(`Failed to remove role: ${error.message}`);
    }
  }
}
