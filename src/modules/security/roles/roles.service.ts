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

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOneById(id: string): Promise<Role> {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(createRoleDto);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
