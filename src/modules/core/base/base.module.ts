import { Module, DynamicModule, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BaseService } from './base.service';

@Global()
@Module({})
export class BaseServiceModule {
  static forEntity(entity: Function): DynamicModule {
    const entityProvider = {
      provide: `BaseService_${entity.name}`,
      useFactory: (dataSource: DataSource) => {
        const repository = dataSource.getRepository(entity);
        return new BaseService(repository);
      },
      inject: [DataSource],
    };

    return {
      module: BaseServiceModule,
      imports: [TypeOrmModule.forFeature([entity])],
      providers: [entityProvider],
      exports: [entityProvider],
    };
  }
}
