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
import { BibliotecaService } from '../services/biblioteca.service';
import { CreateBibliotecaDto } from '../dtos/biblioteca.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@Public()
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

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() datos: CreateBibliotecaDto) {
    return this.bibliotecaService.create(datos);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bibliotecaService.remove(id);
  }
}
