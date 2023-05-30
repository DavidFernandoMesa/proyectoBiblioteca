import { Resolver, Args, Query, Mutation, Int } from '@nestjs/graphql';

import { Autor } from '../entities/autor.entity';
import { CreateAutorDto, UpdateAutorDto } from '../dtos/autor.dto';
import { AutorService } from '../services/autor.service';

@Resolver(() => Autor)
export class AutorResolver {
  constructor(private readonly autorService: AutorService) {}

  // @Query(() => [Autor])
  // async autores() {
  //   return this.autorService.findAll();
  // }

  // @Query(() => Autor)
  // async autor(@Args('id', { type: () => Int }) id: number) {
  //   return this.autorService.findOne(id);
  // }

  // @Mutation(() => Autor)
  // async crearAutor(@Args('datos') datos: CreateAutorDto) {
  //   return this.autorService.create(datos);
  // }

  // @Mutation(() => Autor)
  // async actualizarAutor(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('datos') datos: UpdateAutorDto,
  // ) {
  //   return this.autorService.update(id, datos);
  // }

  // @Mutation(() => Autor)
  // async agregarLibroAAutor(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('idLibro', { type: () => Int }) idLibro: number,
  // ) {
  //   return this.autorService.addLibroByAutor(id, idLibro);
  // }

  // @Mutation(() => Autor)
  // async eliminarAutor(@Args('id', { type: () => Int }) id: number) {
  //   return this.autorService.remove(id);
  // }

  // @Mutation(() => Autor)
  // async eliminarLibroDeAutor(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('idLibro', { type: () => Int }) idLibro: number,
  // ) {
  //   return this.autorService.removeLibroByAutor(id, idLibro);
  // }
}
