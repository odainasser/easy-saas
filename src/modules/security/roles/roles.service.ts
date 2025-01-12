import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../shared/entities/role.entity';
import { CreateRoleDto } from 'src/shared/dtos/roles/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(createRoleDto);
  }

  async update(id: string, role: Role): Promise<Role> {
    await this.roleRepository.update(id, role);
    return this.roleRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
