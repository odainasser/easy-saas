import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { TenantStatus } from '../../../common/enums/tenant-status.enum';

export class UpdateTenantDto {
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
    description: 'Primary contact phone number (including country code)',
    example: '+971501234567',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

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
    description: 'Current operational status of the tenant',
    enum: TenantStatus,
    enumName: 'TenantStatus',
    example: TenantStatus.Active,
    examples: {
      active: {
        value: TenantStatus.Active,
        description: 'Tenant is currently active and operational',
      },
      inactive: {
        value: TenantStatus.Inactive,
        description: 'Tenant is temporarily or permanently disabled',
      },
    },
    required: true,
  })
  @IsEnum(TenantStatus)
  @IsNotEmpty()
  status: TenantStatus;

  @ApiProperty({
    description: 'Website URL of the tenant organization',
    example: 'https://www.propertymanagement.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  website?: string;
}
