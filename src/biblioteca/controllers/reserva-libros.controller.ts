import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReservaLibroService } from '../services/reserva-libro.service';
import {
  CreateLibroReservaDto,
  UpdateLibroReservaDto,
} from '../dtos/reservaLibro.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Public()
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

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() datos: CreateLibroReservaDto) {
    return this.reservaService.create(datos);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: UpdateLibroReservaDto,
  ) {
    return this.reservaService.update(id, datos);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.remove(id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/libro/:idLibro')
  removeLibroToReserva(
    @Param('id', ParseIntPipe) id: number,
    @Param('idLibro', ParseIntPipe) idLibro: number,
  ) {
    return this.reservaService.removeLibroByReserva(id, idLibro);
  }
}
