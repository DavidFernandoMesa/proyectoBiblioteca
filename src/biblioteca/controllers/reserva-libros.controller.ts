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
  CreateLibroReservaDto,
  UpdateLibroReservaDto,
} from '../dtos/reservaLibro.dto';

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
  create(@Body() datos: CreateLibroReservaDto) {
    return this.reservaService.create(datos);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: UpdateLibroReservaDto,
  ) {
    return this.reservaService.update(id, datos);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.remove(id);
  }
}
