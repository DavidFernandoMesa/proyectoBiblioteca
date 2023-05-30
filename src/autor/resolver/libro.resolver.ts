import { ParseIntPipe } from '@nestjs/common';

import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';

import {
  CreateLibroDto,
  FilterLibros,
  UpdateLibroDto,
} from '../dtos/libro.dto';
import { LibroService } from '../services/libro.service';
import { Libro } from '../entities/libro.entity';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/models/roles.model';

@Resolver(() => Libro)
export class LibroResolver {
  constructor(private libroService: LibroService) {}

  @Query(() => [Libro])
  libros(@Args('params') params?: FilterLibros) {
    return this.libroService.findAll(params);
  }

  @Query(() => Libro)
  libro(@Args('id', { type: () => Int }, ParseIntPipe) id: number) {
    return this.libroService.findOne(id);
  }

  // @Query(() => Libro)
  // libroByAutor(@Args('id', ParseIntPipe) id: number) {
  //   return this.libroService.findOne(id);
  // }

  // @Roles(Role.ADMIN, Role.AUTOR)
  @Mutation(() => Libro)
  crearLibro(@Args('input') datos: CreateLibroDto) {
    return this.libroService.create(datos);
  }

  // @Roles(Role.ADMIN, Role.AUTOR)
  // @Mutation(() => Libro)
  // actualizarLibro(
  //   @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  //   @Args('datos') datos: UpdateLibroDto,
  // ) {
  //   return this.libroService.update(id, datos);
  // }

  // @Roles(Role.ADMIN)
  @Mutation(() => Libro)
  eliminarLibro(@Args('id', { type: () => Int }, ParseIntPipe) id: number) {
    return this.libroService.delete(id);
  }

  @Query(() => String)
  HelloWord(): string {
    return 'Hola Mundo';
  }
}
