import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BibliotecaController } from './controllers/biblioteca.controller';
import { ReservaLibrosController } from './controllers/reserva-libros.controller';
import { BibliotecaService } from './services/biblioteca.service';
import { ReservaLibroService } from './services/reserva-libro.service';
import { AutorModule } from 'src/autor/autor.module';
import { Biblioteca } from './entities/biblioteca.entity';
import { ReservaLibro } from './entities/reservaLibro.entity';
import { PersonaController } from './controllers/persona.controller';
import { PersonaService } from './services/persona.service';
import { Persona } from './entities/persona.entity';

@Module({
  imports: [
    forwardRef(() => AutorModule),
    TypeOrmModule.forFeature([Biblioteca, ReservaLibro, Persona]),
  ],
  controllers: [
    BibliotecaController,
    ReservaLibrosController,
    PersonaController,
  ],
  providers: [
    BibliotecaService,
    PersonaService,
    {
      provide: ReservaLibroService,
      useClass: ReservaLibroService,
    },
  ],
  exports: [
    BibliotecaService,
    TypeOrmModule,
    ReservaLibroService,
    PersonaService,
  ],
})
export class BibliotecaModule {}
