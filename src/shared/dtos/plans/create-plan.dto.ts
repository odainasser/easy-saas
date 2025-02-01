import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDecimal,
  IsJSON,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty({
    description: 'Name of the plan',
    example: 'Basic Plan',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the plan',
    example: 'This is a basic plan.',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Price of the plan',
    example: 19.99,
  })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Limits of the plan in JSON format',
    example: '{"maxUsers": 10, "maxProjects": 5}',
  })
  @IsJSON()
  @IsNotEmpty()
  limits: any;
}
