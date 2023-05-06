import { forwardRef, Module } from '@nestjs/common';

import { BibliotecaController } from './controllers/biblioteca.controller';
import { ReservaLibrosController } from './controllers/reserva-libros.controller';
import { BibliotecaService } from './services/biblioteca.service';
import { ReservaLibroService } from './services/reserva-libro.service';
import { AutorModule } from 'src/autor/autor.module';
@Module({
  imports: [forwardRef(() => AutorModule)],
  controllers: [BibliotecaController, ReservaLibrosController],
  providers: [BibliotecaService, ReservaLibroService],
  exports: [BibliotecaService],
})
export class BibliotecaModule {}
