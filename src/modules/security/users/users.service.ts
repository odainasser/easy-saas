import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../db/entities/user.entity';
import { BaseService } from '../../core/base/base.service';

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
}
