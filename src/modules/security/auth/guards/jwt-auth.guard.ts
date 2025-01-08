import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { UserType } from '../../../../common/enums/user-type.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.type != UserType.USER) {
      throw new ForbiddenException('User not found');
    }

    const userRole = await this.usersService.findUserRoleById(user.id);

    if (!userRole) {
      throw new ForbiddenException('User role not found');
    }

    const permissions = userRole.permissions;
    const requestPath = request.path;

    const hasPermission = this.checkPermissions(permissions, requestPath);

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }

  private checkPermissions(
    permissions: Record<string, boolean>,
    requestPath: string,
  ): boolean {
    if (requestPath.startsWith('/auth')) {
      return true;
    }

    return Object.entries(permissions)
      .map(([permission, allowed]) => {
        return allowed && requestPath.startsWith(permission);
      })
      .some((hasPermission) => hasPermission);
  }
}
