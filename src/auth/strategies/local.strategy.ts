import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    // Llamada al constructor de la clase padre PassportStrategy
    super({
      usernameField: 'email', // Configuración del campo de nombre de usuario como 'email'
      passwordField: 'password', // Configuración del campo de contraseña como 'password'
    });
  }

  async validate(email: string, password: string) {
    // Llamada al método validatePersona del authService para validar las credenciales
    const persona = await this.authService.validatePersona(email, password);

    if (!persona) {
      // Si no se encuentra una persona válida, se lanza una excepción UnauthorizedException
      throw new UnauthorizedException('Not Allow');
    }

    // Si la persona es válida, se devuelve la persona validada
    return persona;
  }
}
