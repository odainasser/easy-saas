import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'Manager' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Manager role', required: false })
  @IsString()
  description?: string;

  @ApiProperty({ example: ['users', 'roles'] })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
