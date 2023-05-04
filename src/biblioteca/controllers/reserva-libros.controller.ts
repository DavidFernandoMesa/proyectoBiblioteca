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
import { ReservaLibroService } from '../services/reserva-libro.service';
import {
  CreateLibroReservaDtos,
  UpdateLibroReservaDtos,
} from '../dtos/reservaLibro.dtos';

@Controller('reserva-libros')
export class ReservaLibrosController {
  constructor(private reservaService: ReservaLibroService) {}

  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.findOne(id);
  }

  @Post()
  create(@Body() datos: CreateLibroReservaDtos) {
    return this.reservaService.create(datos);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: UpdateLibroReservaDtos,
  ) {
    return this.reservaService.update(id, datos);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.remove(id);
  }
}
