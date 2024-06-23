import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../../db/entities/user.entity';
import { BaseService } from '../../base/base.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(`BaseService_${User.name}`)
    private readonly baseService: BaseService<User>,
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

  async update(id: number, updateDto: any, userId: number): Promise<User> {
    return this.baseService.update(id, updateDto, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    return this.baseService.remove(id, userId);
  }
}
