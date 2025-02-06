import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSubscriptionDto {
  @ApiProperty({
    description: 'Unique identifier of the plan to subscribe to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  planId: string;
}
