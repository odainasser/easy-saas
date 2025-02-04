import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDecimal,
  IsJSON,
  IsNotEmpty,
} from 'class-validator';
import { PlanType } from '../../../common/enums/plan-type.enum';

export class UpdatePlanDto {
  @ApiProperty({
    description: 'Name of the plan',
    example: 'Updated Basic Plan',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the plan',
    example: 'This is an updated basic plan.',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Price of the plan',
    example: 29.99,
  })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Type of the plan (monthly/yearly)',
    example: 'monthly',
  })
  @IsString()
  @IsNotEmpty()
  type: PlanType;

  @ApiProperty({
    description: 'Limits of the plan in JSON format',
    example: '{"maxUsers": 20, "maxProjects": 10}',
  })
  @IsJSON()
  @IsNotEmpty()
  limits: any;
}
