import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AutorController } from './controllers/autor.controller';
import { AutorService } from './services/autor.service';
import { Autor } from './entities/autor.entity';
import { LibroController } from './controllers/libro.controller';
import { Libro } from './entities/libro.entity';
import { BibliotecaModule } from 'src/biblioteca/biblioteca.module';
import { LibroService } from './services/libro.service';
@Module({
  imports: [
    forwardRef(() => BibliotecaModule),
    TypeOrmModule.forFeature([Autor, Libro]),
  ],
  controllers: [AutorController, LibroController],
  providers: [
    AutorService,
    {
      provide: LibroService,
      useClass: LibroService,
    },
  ],
  exports: [AutorService, LibroService],
})
export class AutorModule {}
