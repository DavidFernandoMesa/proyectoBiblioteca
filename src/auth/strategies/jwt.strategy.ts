import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';

import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/config';
import { PayloadToken } from '../models/token.model';

Injectable();
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    // Llamada al constructor de la clase padre PassportStrategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracción del token JWT del encabezado de autenticación
      ignoreExpiration: false, // No ignorar la expiración del token JWT
      secretOrKey: configService.jwtSecret, // Clave secreta para verificar la firma del token JWT
    });
  }

  validate(payload: PayloadToken) {
    // La función validate simplemente devuelve el payload del token
    return payload;
  }
}
