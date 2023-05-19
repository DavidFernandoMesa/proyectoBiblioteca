import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Biblioteca } from '../entities/biblioteca.entity';
import { CreateBibliotecaDto } from '../dtos/biblioteca.dto';

@Injectable()
export class BibliotecaService {
  constructor(
    @InjectRepository(Biblioteca) private bibliotecaRep: Repository<Biblioteca>,
  ) {}

  findAll() {
    return this.bibliotecaRep.find({
      relations: ['libros', 'personas'],
    });
  }

  async findOne(id: number) {
    const biblioteca = await this.bibliotecaRep.findOne({
      where: { id: id },
      relations: ['libros', 'personas'],
    });
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca #${id} not found`);
    }
    return biblioteca;
  }

  create(data: CreateBibliotecaDto) {
    const newBiblioteca = this.bibliotecaRep.create(data);
    return this.bibliotecaRep.save(newBiblioteca);
  }

  remove(id: number) {
    return this.bibliotecaRep.delete(id);
  }
}
