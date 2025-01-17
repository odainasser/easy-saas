import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Name of the role',
    example: 'Manager',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the role',
    example: 'Manager role',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Comma-separated list of permissions associated with the role',
    example: 'users,roles',
    required: false,
  })
  @IsString()
  permissions?: string;
}
