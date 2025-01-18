import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenantsUsersTable20231010123000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tenantsTableExists = await queryRunner.hasTable('tenants');
    if (!tenantsTableExists) {
      throw new Error('Table "tenants" does not exist');
    }

    const usersTableExists = await queryRunner.hasTable('users');
    if (!usersTableExists) {
      throw new Error('Table "users" does not exist');
    }

    await queryRunner.createTable(
      new Table({
        name: 'tenants_users',
        columns: [
          {
            name: 'tenant_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['owner', 'manager', 'normal'],
            isNullable: false,
            default: "'normal'",
          },
        ],
        foreignKeys: [
          {
            columnNames: ['tenant_id'],
            referencedTableName: 'tenants',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenants_users');
  }
}
