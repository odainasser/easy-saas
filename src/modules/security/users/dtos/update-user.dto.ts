export class UpdateUserDto {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
  readonly isActive?: boolean;
}
