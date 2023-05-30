import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorators';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Obtener los roles permitidos de la metadata utilizando el reflector
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      // Si no se especifican roles, permitir el acceso
      return true;
    }

    // Obtener la solicitud HTTP del contexto
    const request = context.switchToHttp().getRequest();

    // Obtener el usuario autenticado desde la propiedad user de la solicitud
    const user = request.user as PayloadToken;

    // Verificar si el rol del usuario autenticado coincide con al menos uno de los roles permitidos
    const isAuth = roles.some((role) => role === user.role);

    if (!isAuth) {
      // Si el rol del usuario no coincide, lanzar una excepción UnauthorizedException
      throw new UnauthorizedException('Your role is wrong');
    }

    return isAuth;
  }
}
