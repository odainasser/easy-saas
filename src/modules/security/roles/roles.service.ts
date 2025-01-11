import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../shared/entities/role.entity';

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

  create(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async update(id: string, role: Role): Promise<Role> {
    await this.roleRepository.update(id, role);
    return this.roleRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
