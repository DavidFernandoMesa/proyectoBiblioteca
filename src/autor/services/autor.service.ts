import { Injectable, NotFoundException } from '@nestjs/common';

import { Autor } from '../../autor/entities/autor.entity';
import { BibliotecaService } from './../../biblioteca/services/biblioteca.service';
import { CreateAutorDto, UpdateAutorDto } from '../../autor/dtos/autor.dto';

@Injectable()
export class AutorService {
  private counterId = 1;
  constructor(private bibliotecaService: BibliotecaService) {}
  private autor: Autor[] = [
    {
      id: 1,
      nombre: 'Gabriel García Márquez',
      edad: '87',
      nacionalidad: 'Colombiano',
      genero: 'Masculino',
      obras_publicadas: [],
    },
  ];

  findAll() {
    return this.autor;
  }

  findOne(id: number) {
    const autor = this.autor.find((item) => item.id === id);
    if (!autor) {
      throw new NotFoundException(`Autor #${id} not found`);
    }
    return autor;
  }

  create(data: CreateAutorDto) {
    this.counterId = this.counterId + 1;
    const newAutor = {
      id: this.counterId,
      ...data,
    };
    this.autor.push(newAutor);
    this.bibliotecaService.agregarPersona(newAutor); // Agregar el nuevo autor al atributo de personas de Biblioteca
    return newAutor;
  }

  update(id: number, changes: UpdateAutorDto) {
    const autor = this.findOne(id);
    const index = this.autor.findIndex((item) => item.id === id);
    this.autor[index] = {
      ...autor,
      ...changes,
    };
    return this.autor[index];
  }

  remove(id: number) {
    const index = this.autor.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Autor #${id} not found`);
    }
    this.autor.splice(index, 1);
    return true;
  }
}
