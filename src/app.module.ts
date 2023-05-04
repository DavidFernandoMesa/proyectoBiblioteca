import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { AutorModule } from './autor/autor.module';

@Module({
  imports: [BibliotecaModule, AutorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
