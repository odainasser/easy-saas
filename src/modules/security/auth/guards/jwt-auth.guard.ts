import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const dbRole = await this.usersService.findOneByEmail(user.email);

    if (!dbRole) {
      throw new ForbiddenException('User not found');
    }

    return true;
  }
}
