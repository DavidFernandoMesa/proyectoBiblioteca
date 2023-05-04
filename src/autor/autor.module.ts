import { Module } from '@nestjs/common';

import { AutorController } from './controllers/autor.controller';
import { LibroController } from './controllers/libro.controller';
import { AutorService } from './services/autor.service';
import { LibroService } from './services/libro.service';

@Module({
  controllers: [AutorController, LibroController],
  providers: [AutorService, LibroService],
})
export class AutorModule {}
