import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BaseServiceModule } from '../../base/base.module';
import { User } from '../../../shared/entities/user.entity';

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
