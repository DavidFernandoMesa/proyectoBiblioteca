import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Configuración del proveedor de clave secreta
      secretOrKeyProvider: passportJwtSecret({
        // Almacenar en caché la clave secreta
        cache: true,
        // Aplicar límite de velocidad para las solicitudes
        rateLimit: true,
        // Número máximo de solicitudes por minuto para obtener claves públicas
        jwksRequestsPerMinute: 5,
        // URL del archivo JWKS utilizado para verificar los tokens JWT
        jwksUri: `${process.env.AUTH0_ISSUER_URL}/.well-known/jwks.json`,
      }),
      // Extracción del token JWT del encabezado de autenticación
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Audiencia a la que está dirigido el token JWT
      audience: process.env.AUTH0_AUDIENCE,
      // Entidad emisora del token JWT
      issuer: process.env.AUTH0_ISSUER_URL,
      // Algoritmo de firma utilizado para los tokens JWT
      algorithms: ['RS256'],
    });
  }

  async validate(payload: unknown): Promise<unknown> {
    // Devuelve el valor del parámetro "payload" sin realizar ninguna validación adicional
    return payload;
  }
}
