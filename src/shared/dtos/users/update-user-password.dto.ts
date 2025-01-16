import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: 'P@ssw0rd123',
    description: "The user's new password",
  })
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: 'P@ssw0rd123',
    description: "The user's password confirmation",
  })
  confirmPassword: string;
}
