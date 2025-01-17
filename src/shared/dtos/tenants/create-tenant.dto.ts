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
    description: 'Legal or business name of the tenant organization',
    example: 'Property Management LLC',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Primary contact email address for the tenant organization',
    example: 'contact@propertymanagement.com',
    required: true,
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
    description:
      'Unique subdomain identifier for the tenant (lowercase, no spaces)',
    example: 'property-management',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiProperty({
    description: 'Physical address of the tenant organization',
    example: 'Dubai Marina, Tower A, Floor 12, Office 1204',
    required: false,
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
