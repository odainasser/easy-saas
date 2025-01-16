import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateUsersTable20231010120000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'roleId',
            type: 'uuid',
            isNullable: true,
            default: null,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Seed data
    const userPassword = await bcrypt.hash('userpassword', 10);
    await queryRunner.manager.getRepository('users').save({
      firstName: 'User',
      lastName: 'User',
      email: 'user@example.com',
      password: userPassword,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    await queryRunner.dropTable('users');
  }
}
