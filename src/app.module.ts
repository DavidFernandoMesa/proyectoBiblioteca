import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaController } from './controllers/biblioteca/biblioteca.controller';
import { LibroController } from './controllers/libro/libro.controller';
import { AutorController } from './controllers/autor/autor.controller';
import { ReservaLibrosController } from './controllers/reserva-libros/reserva-libros.controller';
import { AutorService } from './services/autor/autor.service';
import { LibroService } from './services/libro/libro.service';
import { BibliotecaService } from './services/biblioteca/biblioteca.service';
import { ReservaLibroService } from './services/reserva-libro/reserva-libro.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    BibliotecaController,
    LibroController,
    AutorController,
    ReservaLibrosController,
  ],
  providers: [
    AppService,
    AutorService,
    LibroService,
    BibliotecaService,
    ReservaLibroService,
  ],
})
export class AppModule {}
