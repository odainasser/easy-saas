import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

export class Seeder1719226160403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Role);
    const userRepository = queryRunner.manager.getRepository(User);

    const now = new Date();

    const adminRole = roleRepository.create({
      name: 'Admin',
      permissions: { users: true, roles: true },
      description: 'Administrator role with full permissions',
    });

    const userRole = roleRepository.create({
      name: 'User',
      permissions: { users: false, roles: false },
      description: 'Regular user role',
    });

    await roleRepository.save([adminRole, userRole]);

    const adminPassword = await bcrypt.hash('adminpassword', 10);
    const userPassword = await bcrypt.hash('userpassword', 10);

    const adminUser = userRepository.create({
      roleId: adminRole.id,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: adminPassword,
    });

    const regularUser = userRepository.create({
      roleId: userRole.id,
      firstName: 'Regular',
      lastName: 'User',
      email: 'user@example.com',
      password: userPassword,
    });

    await userRepository.save([adminUser, regularUser]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    const roleRepository = queryRunner.manager.getRepository(Role);

    await userRepository.delete({ email: 'admin@example.com' });
    await userRepository.delete({ email: 'user@example.com' });

    await roleRepository.delete({ name: 'Admin' });
    await roleRepository.delete({ name: 'User' });
  }
}
