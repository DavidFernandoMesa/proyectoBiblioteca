import { ParseIntPipe } from '@nestjs/common';

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import {
  CreateLibroDto,
  FilterLibros,
  UpdateLibroDto,
} from '../dtos/libro.dto';
import { LibroService } from '../services/libro.service';
import { Libro } from '../entities/libro.entity';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/models/roles.model';

@Resolver()
export class LibroResolver {
  constructor(private libroService: LibroService) {}

  @Query(() => [Libro])
  libros(@Args('params') params?: FilterLibros) {
    return this.libroService.findAll(params);
  }

  //   @Query(() => Libro)
  //   libro(@Args('id', ParseIntPipe) id: number) {
  //     return this.libroService.findOne(id);
  //   }

  //   @Query(() => Libro)
  //   libroByAutor(@Args('id', ParseIntPipe) id: number) {
  //     return this.libroService.findOne(id);
  //   }

  //   @Roles(Role.ADMIN, Role.AUTOR)
  //   @Mutation(() => Libro)
  //   crearLibro(@Args() datos: CreateLibroDto) {
  //     return this.libroService.create(datos);
  //   }

  //   @Roles(Role.ADMIN, Role.AUTOR)
  //   @Mutation(() => Libro)
  //   actualizarLibro(
  //     @Args('id', ParseIntPipe) id: number,
  //     @Args() datos: UpdateLibroDto,
  //   ) {
  //     return this.libroService.update(id, datos);
  //   }

  //   @Roles(Role.ADMIN)
  //   @Mutation(() => Libro)
  //   eliminarLibro(@Args('id', ParseIntPipe) id: number) {
  //     return this.libroService.delete(id);
  //   }

  @Query(() => String)
  HelloWord(): string {
    return 'Hola Mundo';
  }
}
