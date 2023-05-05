import { Injectable, NotFoundException } from '@nestjs/common';

import { Biblioteca } from '../entities/biblioteca.entity';
import {
  CreateBibliotecaDto,
  UpdateBibliotecaDto,
} from '../dtos/biblioteca.dto';
import { Autor } from 'src/autor/entities/autor.entity';
import { Libro } from './../../autor/entities/libro.entity';

@Injectable()
export class BibliotecaService {
  private counterId = 1;
  private biblioteca: Biblioteca[] = [
    {
      id: 1,
      libros: [],
      personas: [],
    },
  ];

  findAll() {
    return this.biblioteca;
  }

  agregarLibro(libro: Libro) {
    const biblioteca = this.biblioteca[0]; // Ya que solo hay una biblioteca
    biblioteca.libros.push(libro);
  }

  agregarPersona(persona: Autor) {
    const biblioteca = this.biblioteca[0];
    biblioteca.personas.push(persona);
  }

  findOne(id: number) {
    const biblioteca = this.biblioteca.find((item) => item.id === id);
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca #${id} not found`);
    }
    return biblioteca;
  }

  create(data: CreateBibliotecaDto) {
    this.counterId = this.counterId + 1;
    const newBiblioteca = {
      id: this.counterId,
      ...data,
    };
    this.biblioteca.push(newBiblioteca);
    return newBiblioteca;
  }

  update(id: number, changes: UpdateBibliotecaDto) {
    const biblioteca = this.findOne(id);
    const index = this.biblioteca.findIndex((item) => item.id === id);
    this.biblioteca[index] = {
      ...biblioteca,
      ...changes,
    };
    return this.biblioteca[index];
  }

  delete(id: number) {
    const index = this.biblioteca.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Biblioteca #${id} not found`);
    }
    this.biblioteca.splice(index, 1);
    return true;
  }
}
