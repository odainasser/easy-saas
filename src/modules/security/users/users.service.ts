import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../shared/entities/user.entity';
import { CreateUserDto } from '../../../shared/dtos/users/create-user.dto';
import { UpdateUserDto } from '../../../shared/dtos/users/update-user.dto';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userPassword = await bcrypt.hash(createUserDto.password, 10);
      let role = null;
      if (createUserDto.roleId) {
        role = await this.rolesService.findOneById(createUserDto.roleId);
        if (!role) {
          throw new Error(`Role with id ${createUserDto.roleId} not found`);
        }
      }
      const user = this.userRepository.create({
        ...createUserDto,
        password: userPassword,
        role: role,
      });
      const savedUser = await this.userRepository.save(user);
      const { password, ...result } = savedUser;
      return { ...result, password: null } as User;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({ relations: ['role'] });
      return users.map((user) => {
        const { password, ...result } = user;
        return { ...result, password: null, role: user.role } as User;
      });
    } catch (error) {
      throw new Error(`Failed to find users: ${error.message}`);
    }
  }

  async findOneByID(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      const { password, ...result } = user;
      return { ...result, password: null } as User;
    } catch (error) {
      throw new Error(`Failed to find user by ID: ${error.message}`);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new Error(`Failed to find user by email: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      if (updateUserDto.roleId) {
        const role = await this.rolesService.findOneById(updateUserDto.roleId);
        if (!role) {
          throw new Error(`Role with id ${updateUserDto.roleId} not found`);
        }
        user.role = role;
      }
      Object.assign(user, updateUserDto);
      const updatedUser = await this.userRepository.save(user);
      const { password, ...result } = updatedUser;
      return { ...result, password: null } as User;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async updatePassword(id: string, newPassword: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      const updatedUser = await this.userRepository.save(user);
      const { password, ...result } = updatedUser;
      return { ...result, password: null } as User;
    } catch (error) {
      throw new Error(`Failed to update password: ${error.message}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        throw new Error(`User with id ${id} not found`);
      }
      await this.userRepository.softRemove(user);
    } catch (error) {
      throw new Error(`Failed to remove user: ${error.message}`);
    }
  }
}
