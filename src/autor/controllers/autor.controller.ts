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
import { AutorService } from './../services/autor.service';
import { CreateAutorDto, UpdateAutorDto } from '../dtos/autor.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/models/roles.model';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('autor')
export class AutorController {
  constructor(private autorService: AutorService) {}

  @Public()
  @Get()
  findAll() {
    return this.autorService.findAll();
  }

  @Public()
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.autorService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  // @Roles(Role.ADMIN)
  @Post()
  create(@Body() datos: CreateAutorDto) {
    return this.autorService.create(datos);
  }

  @UseGuards(AuthGuard('jwt'))
  // @Roles(Role.ADMIN)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() datos: UpdateAutorDto) {
    return this.autorService.update(id, datos);
  }

  @UseGuards(AuthGuard('jwt'))
  // @Roles(Role.ADMIN)
  @Put(':id/libro/:idLibro')
  updateLibroToAutor(
    @Param('id', ParseIntPipe) id: number,
    @Param('idLibro', ParseIntPipe) idLibro: number,
  ) {
    return this.autorService.addLibroByAutor(id, idLibro);
  }

  @UseGuards(AuthGuard('jwt'))
  // @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.autorService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  // @Roles(Role.ADMIN)
  @Delete(':id/libro/:idLibro')
  removeLibroToAutor(
    @Param('id', ParseIntPipe) id: number,
    @Param('idLibro', ParseIntPipe) idLibro: number,
  ) {
    return this.autorService.removeLibroByAutor(id, idLibro);
  }
}
