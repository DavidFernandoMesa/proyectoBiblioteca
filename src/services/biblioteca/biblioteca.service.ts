import { Injectable, NotFoundException } from '@nestjs/common';
import { Biblioteca } from './../..//entities/biblioteca.entity';
import {
  CreateBibliotecaDtos,
  UpdateBibliotecaDtos,
} from './../../dtos/biblioteca.dtos';

@Injectable()
export class BibliotecaService {
  private counterId = 1;
  private biblioteca: Biblioteca[] = [
    {
      id: 1,
      libros: [
        'Cien años de soledad',
        'Crónica de una muerte anunciada',
        'El amor en los tiempos del cólera',
        'Del amor y otros demonios',
      ],
      personas: ['Gabriel García Márquez', 'David Fernando Mesa'],
    },
  ];

  findAll() {
    return this.biblioteca;
  }

  findOne(id: number) {
    const biblioteca = this.biblioteca.find((item) => item.id === id);
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca #${id} not found`);
    }
    return biblioteca;
  }

  create(data: CreateBibliotecaDtos) {
    this.counterId = this.counterId + 1;
    const newBiblioteca = {
      id: this.counterId,
      ...data,
    };
    this.biblioteca.push(newBiblioteca);
    return newBiblioteca;
  }

  update(id: number, changes: UpdateBibliotecaDtos) {
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
