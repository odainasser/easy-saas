import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ example: 'Manager' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Manager role', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: 'users,roles', required: false })
  @IsString()
  permissions?: string;
}
