import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/rol-protected/rol-protected.decorator';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const vaidRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    if (!vaidRoles || vaidRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new Error('Usuario no encontrado en el request');

    if (vaidRoles.includes(user.rol)) {
      return true;
    }

    console.log(user.rol);

    throw new ForbiddenException(
      `El usuario no tiene permisos "${vaidRoles}" para acceder a este recurso`,
    );
  }
}
