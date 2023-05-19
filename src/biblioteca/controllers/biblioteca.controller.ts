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
import { BibliotecaService } from '../services/biblioteca.service';
import {
  CreateBibliotecaDto,
  UpdateBibliotecaDto,
} from '../dtos/biblioteca.dto';

@Controller('biblioteca')
export class BibliotecaController {
  constructor(private bibliotecaService: BibliotecaService) {}

  @Get()
  findAll() {
    return this.bibliotecaService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.bibliotecaService.findOne(id);
  }

  @Post()
  create(@Body() datos: CreateBibliotecaDto) {
    return this.bibliotecaService.create(datos);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bibliotecaService.remove(id);
  }
}
