import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Unique identifier for the user' })
  @IsUUID()
  readonly id: string;

  @ApiPropertyOptional({ description: 'Name of the user' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({ description: 'Email address of the user' })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({ description: 'Password for the user' })
  @IsOptional()
  @IsString()
  readonly password?: string;

  @ApiPropertyOptional({ description: 'Indicates if the user is active' })
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
