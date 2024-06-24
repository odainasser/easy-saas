import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../../../db/entities/user.entity';
import { BaseServiceModule } from '../../base/base.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BaseServiceModule.forEntity(User),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
