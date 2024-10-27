import { Repository, DeepPartial } from 'typeorm';

export class BaseService<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(createDto: DeepPartial<T>, userId: number): Promise<T> {
    const entity = this.repository.create(createDto);
    entity['createdBy'] = userId;
    entity['createdAt'] = new Date();
    entity['updatedAt'] = new Date();
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find({ where: { deletedAt: null } as any });
  }

  async findOne(id: number): Promise<T> {
    return await this.repository.findOne({
      where: { id, deletedAt: null } as any,
    });
  }

  async update(
    id: number,
    updateDto: DeepPartial<T>,
    userId: number,
  ): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: null } as any,
    });
    if (entity) {
      entity['updatedBy'] = userId;
      entity['updatedAt'] = new Date();
      Object.assign(entity, updateDto);
      return await this.repository.save(entity);
    }
    return null;
  }

  async remove(id: number, userId: number): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id, deletedAt: null } as any,
    });
    if (entity) {
      entity['deletedBy'] = userId;
      entity['deletedAt'] = new Date();
      await this.repository.save(entity);
    }
  }
}
