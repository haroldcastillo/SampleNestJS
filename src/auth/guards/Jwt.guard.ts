import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Check for the presence of the refresh token in cookies
    if (!request.cookies['refreshToken']) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    return super.canActivate(context);
  }
}
