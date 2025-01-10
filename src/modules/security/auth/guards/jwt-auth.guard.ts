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
    const canActivate = await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const dbUser = await this.usersService.findOneByEmail(user.email);

    if (!dbUser) {
      throw new ForbiddenException('User not found');
    }
    return canActivate && !!dbUser;
  }
}
