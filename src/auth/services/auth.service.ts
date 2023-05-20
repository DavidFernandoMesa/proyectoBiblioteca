import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PersonaService } from 'src/biblioteca/services/persona.service';
import { Persona } from 'src/biblioteca/entities/persona.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private personaService: PersonaService,
    private jwtService: JwtService,
  ) {}

  async validatePersona(email: string, password: string) {
    // Llamada al método findByEmail del personaService para buscar una persona por su email
    const persona = await this.personaService.findByEmail(email);

    if (persona) {
      // Verificar si la contraseña coincide utilizando bcrypt.compare
      const isMatch = await bcrypt.compare(password, persona.password);

      if (isMatch) {
        // Si la contraseña coincide, se devuelve la persona
        return persona;
      }
    }

    // Si no se encuentra la persona o la contraseña no coincide, se devuelve null
    return null;
  }

  generateJWT(persona: Persona) {
    // Crear el payload del token con el rol y sub (id) de la persona
    const payload: PayloadToken = { role: persona.role, sub: persona.id };

    return {
      acces_token: this.jwtService.sign(payload), // Generar el token JWT utilizando jwtService
      persona, // Devolver también la persona en el objeto de respuesta
    };
  }
}
