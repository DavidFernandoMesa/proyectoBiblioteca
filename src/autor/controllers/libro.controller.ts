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
import { LibroService } from '../services/libro.service';
import { CreateLibroDto, UpdateLibroDto } from '../dtos/libro.dto';

@Controller('libro')
export class LibroController {
  constructor(private libroService: LibroService) {}

  @Get()
  findAll() {
    return this.libroService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.findOne(id);
  }

  @Post()
  create(@Body() datos: CreateLibroDto) {
    return this.libroService.create(datos);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() datos: UpdateLibroDto) {
    return this.libroService.update(id, datos);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.delete(id);
  }
}
