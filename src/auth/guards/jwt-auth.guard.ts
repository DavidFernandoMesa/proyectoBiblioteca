import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_PUBLIC_KEY } from './../decorators/public.decorator';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    // Llamada al constructor de la clase padre AuthGuard
    super();
  }

  canActivate(context: ExecutionContext) {
    // Obtener el valor de la metadata IS_PUBLIC_KEY utilizando el reflector
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      // Si la metadata indica que la ruta es pública, permitir el acceso
      return true;
    }

    // Llamada al método canActivate de la clase padre AuthGuard
    return super.canActivate(context);
  }
}
