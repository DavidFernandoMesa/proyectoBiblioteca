import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { LibroService } from '../services/libro.service';
import {
  CreateLibroDto,
  FilterLibros,
  UpdateLibroDto,
} from '../dtos/libro.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Public()
@Controller('libro')
export class LibroController {
  constructor(private libroService: LibroService) {}

  @Get()
  findAll(@Query() params: FilterLibros) {
    return this.libroService.findAll(params);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.findOne(id);
  }

  @Get(':id')
  getLibroByAutor(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.AUTOR)
  @Post()
  create(@Body() datos: CreateLibroDto) {
    return this.libroService.create(datos);
  }

  @Roles(Role.ADMIN, Role.AUTOR)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() datos: UpdateLibroDto) {
    return this.libroService.update(id, datos);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.delete(id);
  }
}
