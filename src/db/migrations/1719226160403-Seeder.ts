import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../shared/entities/user.entity';

export class Seeder1719226160403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const userPassword = await bcrypt.hash('userpassword', 10);

    const regularUser = userRepository.create({
      firstName: 'User',
      lastName: 'User',
      email: 'user@example.com',
      password: userPassword,
    });

    await userRepository.save([regularUser]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);
    await userRepository.delete({ email: 'user@example.com' });
  }
}
