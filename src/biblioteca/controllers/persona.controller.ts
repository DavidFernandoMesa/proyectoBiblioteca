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

import { PersonaService } from './../services/persona.service';
import { CreatePersonaDto, UpdatePersonaDto } from '../dtos/persona.dto';

@Controller('persona')
export class PersonaController {
  constructor(private personaService: PersonaService) {}

  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.personaService.findOne(id);
  }

  @Post()
  create(@Body() datos: CreatePersonaDto) {
    return this.personaService.create(datos);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: UpdatePersonaDto,
  ) {
    return this.personaService.update(id, datos);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.personaService.remove(id);
  }
}
