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

import { PersonaService } from './../services/persona.service';
import { CreatePersonaDto, UpdatePersonaDto } from '../dtos/persona.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('persona')
export class PersonaController {
  constructor(private personaService: PersonaService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.personaService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() datos: CreatePersonaDto) {
    return this.personaService.create(datos);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: UpdatePersonaDto,
  ) {
    return this.personaService.update(id, datos);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.personaService.remove(id);
  }
}
