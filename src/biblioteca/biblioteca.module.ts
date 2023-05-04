import { Module } from '@nestjs/common';

import { BibliotecaController } from './controllers/biblioteca.controller';
import { ReservaLibrosController } from './controllers/reserva-libros.controller';
import { BibliotecaService } from './services/biblioteca.service';
import { ReservaLibroService } from './services/reserva-libro.service';

@Module({
  controllers: [BibliotecaController, ReservaLibrosController],
  providers: [BibliotecaService, ReservaLibroService],
})
export class BibliotecaModule {}
