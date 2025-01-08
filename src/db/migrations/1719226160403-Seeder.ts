import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/shared/entities/role.entity';
import { Tenant } from 'src/shared/entities/tenant.entity';
import { User } from 'src/shared/entities/user.entity';

export class Seeder1719226160403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Role);
    const userRepository = queryRunner.manager.getRepository(User);
    const tenantRepository = queryRunner.manager.getRepository(Tenant);

    const now = new Date();

    const adminRole = roleRepository.create({
      name: 'Admin',
      permissions: { users: true, roles: true },
      description: 'Administrator role with full permissions',
      createdAt: now,
      updatedAt: now,
    });

    const userRole = roleRepository.create({
      name: 'User',
      permissions: { users: false, roles: false },
      description: 'Regular user role',
      createdAt: now,
      updatedAt: now,
    });

    await roleRepository.save([adminRole, userRole]);

    const adminPassword = await bcrypt.hash('adminpassword', 10);
    const userPassword = await bcrypt.hash('userpassword', 10);
    const tenantPassword = await bcrypt.hash('tenantpassword', 10);

    const adminUser = userRepository.create({
      roleId: adminRole.id,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: adminPassword,
      createdAt: now,
      updatedAt: now,
    });

    const regularUser = userRepository.create({
      roleId: userRole.id,
      firstName: 'Regular',
      lastName: 'User',
      email: 'user@example.com',
      password: userPassword,
      createdAt: now,
      updatedAt: now,
    });

    await userRepository.save([adminUser, regularUser]);

    const tenant1 = tenantRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'tenant1@example.com',
      password: tenantPassword,
      phoneNumber: '123456789',
      nationalId: 'TID123456',
      emergencyContact: 'EC123456',
      dateOfBirth: new Date('1990-01-01'),
      passportNumber: 'P123456789',
      createdAt: now,
      updatedAt: now,
    });

    const tenant2 = tenantRepository.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'tenant2@example.com',
      password: tenantPassword,
      phoneNumber: '987654321',
      nationalId: 'TID987654',
      emergencyContact: 'EC987654',
      dateOfBirth: new Date('1992-02-02'),
      passportNumber: 'P987654321',
      createdAt: now,
      updatedAt: now,
    });

    await tenantRepository.save([tenant1, tenant2]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const roleRepository = queryRunner.manager.getRepository(Role);
    const tenantRepository = queryRunner.manager.getRepository(Tenant);

    await tenantRepository.delete({ email: 'tenant1@example.com' });
    await tenantRepository.delete({ email: 'tenant2@example.com' });

    await userRepository.delete({ email: 'admin@example.com' });
    await userRepository.delete({ email: 'user@example.com' });

    await roleRepository.delete({ name: 'Admin' });
    await roleRepository.delete({ name: 'User' });
  }
}
