import { Injectable, NotFoundException } from '@nestjs/common';
import { Autor } from '../../autor/entities/autor.entity';
import { CreateAutorDtos, UpdateAutorDtos } from '../../autor/dtos/autor.dtos';

@Injectable()
export class AutorService {
  private counterId = 1;
  private autor: Autor[] = [
    {
      id: 1,
      nombre: 'Gabriel García Márquez',
      edad: '87',
      nacionalidad: 'Colombiano',
      genero: 'Masculino',
      obras_publicadas: [
        'Cien años de soledad',
        'Crónica de una muerte anunciada',
        'El amor en los tiempos del cólera',
        'Del amor y otros demonios',
        'La hojarasca',
      ],
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

  create(data: CreateAutorDtos) {
    this.counterId = this.counterId + 1;
    const newAutor = {
      id: this.counterId,
      ...data,
    };
    this.autor.push(newAutor);
    return newAutor;
  }

  update(id: number, changes: UpdateAutorDtos) {
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
