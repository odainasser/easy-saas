import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TenantUserType } from '../../../common/enums/tenant-user-type.enum';

export class UpdateTenantUserDto {
  @ApiProperty({
    description: 'The type of the user in the tenant',
    example: TenantUserType.OWNER,
  })
  @IsEnum(TenantUserType)
  type: TenantUserType;
}
