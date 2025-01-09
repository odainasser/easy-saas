import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/shared/entities/user.entity';

export class Seeder1719226160403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const now = new Date();

    // const adminRole = roleRepository.create({
    //   name: 'Admin',
    //   description: 'Administrator role with full permissions',
    //   createdAt: now,
    //   updatedAt: now,
    // });

    // const userRole = roleRepository.create({
    //   name: 'User',
    //   description: 'Regular user role',
    //   createdAt: now,
    //   updatedAt: now,
    // });

    // await roleRepository.save([adminRole, userRole]);

    // const adminPassword = await bcrypt.hash('adminpassword', 10);
    // const userPassword = await bcrypt.hash('userpassword', 10);

    // const adminUser = userRepository.create({
    //   roleId: adminRole.id,
    //   firstName: 'Admin',
    //   lastName: 'User',
    //   email: 'admin@example.com',
    //   password: adminPassword,
    //   createdAt: now,
    //   updatedAt: now,
    // });

    // const regularUser = userRepository.create({
    //   roleId: userRole.id,
    //   firstName: 'Regular',
    //   lastName: 'User',
    //   email: 'user@example.com',
    //   password: userPassword,
    //   createdAt: now,
    //   updatedAt: now,
    // });

    //await userRepository.save([adminUser, regularUser]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    await userRepository.delete({ email: 'admin@example.com' });
    await userRepository.delete({ email: 'user@example.com' });
  }
}
