import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class TenantLoginDto {
  @ApiProperty({
    example: 'tenant1@example.com',
    description: 'The email address of the tenant',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'tenantpassword',
    description: 'The password of the tenant',
  })
  @IsString()
  password: string;
}
