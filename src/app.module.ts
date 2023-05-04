import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaController } from './biblioteca/controllers/biblioteca.controller';
import { LibroController } from './autor/controllers/libro.controller';
import { AutorController } from './controllers/autor/autor.controller';
import { ReservaLibrosController } from './biblioteca/controllers/reserva-libros.controller';
import { AutorService } from './services/autor/autor.service';
import { LibroService } from './autor/services/libro.service';
import { BibliotecaService } from './biblioteca/services/biblioteca.service';
import { ReservaLibroService } from './biblioteca/services/reserva-libro.service';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { AutorModule } from './autor/autor.module';

@Module({
  imports: [BibliotecaModule, AutorModule],
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
