import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { TenantStatus } from '../../../common/enums/tenant-status.enum';

export class CreateTenantDto {
  @ApiProperty({
    description: 'The name of the tenant',
    example: 'Example Company',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the tenant',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The phone number of the tenant',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'The domain of the tenant',
    example: 'example-company',
  })
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiProperty({
    description: 'The address of the tenant',
    example: '123 Main St, Anytown, USA',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'The status of the tenant',
    example: 'active',
  })
  @IsEnum(TenantStatus)
  @IsNotEmpty()
  status: TenantStatus;
}
