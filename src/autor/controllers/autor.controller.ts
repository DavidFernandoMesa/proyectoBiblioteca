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
import { AutorService } from './../../services/autor/autor.service';
import { CreateAutorDtos, UpdateAutorDtos } from '../dtos/autor.dtos';

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
  create(@Body() datos: CreateAutorDtos) {
    return this.autorService.create(datos);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: UpdateAutorDtos,
  ) {
    return this.autorService.update(id, datos);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.autorService.remove(id);
  }
}
