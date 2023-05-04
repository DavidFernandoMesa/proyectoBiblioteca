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
  CreateBibliotecaDtos,
  UpdateBibliotecaDtos,
} from '../dtos/biblioteca.dtos';

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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: UpdateBibliotecaDtos,
  ) {
    return this.bibliotecaService.update(id, datos);
  }
}
