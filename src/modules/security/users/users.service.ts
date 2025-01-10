import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../shared/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: userPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const { password, ...result } = savedUser;
    return { ...result, password: null } as User;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByID(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
