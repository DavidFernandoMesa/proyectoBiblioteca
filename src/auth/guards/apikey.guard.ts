import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import config from './../../config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Request } from 'express';

@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Obtener el valor de la metadata IS_PUBLIC_KEY utilizando el reflector
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

    if (isPublic) {
      // Si la metadata indica que la ruta es pública, permitir el acceso
      return true;
    }

    // Obtener la solicitud HTTP del contexto
    const request = context.switchToHttp().getRequest<Request>();

    // Obtener el encabezado 'auth' de la solicitud
    const authHeader = request.header('auth');

    // Verificar si el valor del encabezado 'auth' coincide con la API key configurada
    const isAuth = authHeader === this.configService.apiKey;

    if (!isAuth) {
      // Si la API key no coincide, lanzar una excepción UnauthorizedException
      throw new UnauthorizedException('NOT ALLOW');
    }

    // Permitir el acceso si la API key coincide
    return true;
  }
}
