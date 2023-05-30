import { forwardRef, Module } from '@nestjs/common';

import { AutorController } from './controllers/autor.controller';
import { AutorService } from './services/autor.service';
import { AutorResolver } from './resolver/autor.resolver';
import { LibroController } from './controllers/libro.controller';
import { BibliotecaModule } from 'src/biblioteca/biblioteca.module';
import { LibroService } from './services/libro.service';
import { LibroResolver } from './resolver/libro.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [forwardRef(() => BibliotecaModule), PrismaModule],
  controllers: [AutorController, LibroController],
  providers: [
    AutorService,
    LibroResolver,
    {
      provide: LibroService,
      useClass: LibroService,
    },
    AutorResolver,
  ],
  exports: [AutorService, LibroService],
})
export class AutorModule {}
