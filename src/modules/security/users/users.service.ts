import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/base.service';
import { Role } from 'src/shared/entities/role.entity';
import { User } from '../../../shared/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(`BaseService_${User.name}`)
    private readonly baseService: BaseService<User>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createDto: any, userId: number): Promise<User> {
    return this.baseService.create(createDto, userId);
  }

  async findAll(): Promise<User[]> {
    return this.baseService.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.baseService.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email, deletedAt: null } });
  }

  async update(id: number, updateDto: any, userId: number): Promise<User> {
    return this.baseService.update(id, updateDto, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    return this.baseService.remove(id, userId);
  }

  async findUserRoleById(id: number): Promise<Role> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['role'],
    });
    return user?.role;
  }
}
