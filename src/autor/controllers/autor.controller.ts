import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AutorService } from './../services/autor.service';
import { CreateAutorDto, UpdateAutorDto } from '../dtos/autor.dto';

@Controller('autor')
export class AutorController {
  constructor(private autorService: AutorService) {}

  @Get()
  findAll() {
    return this.autorService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.autorService.findOne(id);
  }

  @Post()
  create(@Body() datos: CreateAutorDto) {
    return this.autorService.create(datos);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() datos: UpdateAutorDto) {
    return this.autorService.update(id, datos);
  }

  @Put(':id/libro/:idLibro')
  updateLibroToAutor(
    @Param('id', ParseIntPipe) id: number,
    @Param('idLibro', ParseIntPipe) idLibro: number,
  ) {
    return this.autorService.addLibroByAutor(id, idLibro);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.autorService.remove(id);
  }

  @Delete(':id/libro/:idLibro')
  removeLibroToAutor(
    @Param('id', ParseIntPipe) id: number,
    @Param('idLibro', ParseIntPipe) idLibro: number,
  ) {
    return this.autorService.removeLibroByAutor(id, idLibro);
  }
}
