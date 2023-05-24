import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Autor } from '../../autor/entities/autor.entity';
import { CreateAutorDto, UpdateAutorDto } from '../../autor/dtos/autor.dto';
import { Libro } from '../entities/libro.entity';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(Autor) private autorRep: Repository<Autor>,
    @InjectRepository(Libro) private libroRep: Repository<Libro>,
  ) {}

  findAll() {
    return this.autorRep.find({
      relations: ['obras_publicadas'],
    });
  }

  async findOne(id: number) {
    const autor = await this.autorRep.findOne({
      where: { id: id },
      relations: ['obras_publicadas'],
    });
    if (!autor) {
      throw new NotFoundException(`Autor #${id} not found`);
    }
    return autor;
  }

  create(data: CreateAutorDto) {
    const newAutor = this.autorRep.create(data);
    return this.autorRep.save(newAutor);
  }

  async update(id: number, changes: UpdateAutorDto) {
    const autor = await this.autorRep.findOneBy({ id: id });
    this.autorRep.merge(autor, changes);
    return this.autorRep.save(autor);
  }

  async removeLibroByAutor(idAutor: number, idLibro: number) {
    const autor = await this.autorRep.findOne({
      where: { id: idAutor },
      relations: ['obras_publicadas'],
    });
    autor.obras_publicadas = autor.obras_publicadas.filter(
      (item) => item.id !== idLibro,
    );
    return this.autorRep.save(autor);
  }

  async addLibroByAutor(idAutor: number, idLibro: number) {
    const autor = await this.autorRep.findOne({
      where: { id: idAutor },
      relations: ['obras_publicadas'],
    });
    const libro = await this.libroRep.findOne({ where: { id: idLibro } });
    autor.obras_publicadas.push(libro);
    return this.autorRep.save(autor);
  }

  remove(id: number) {
    return this.autorRep.delete(id);
  }
}
