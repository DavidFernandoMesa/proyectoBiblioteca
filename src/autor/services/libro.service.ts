import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from 'pg';
import { Libro } from '../entities/libro.entity';
import { AutorService } from './../services/autor.service';
import { BibliotecaService } from './../../biblioteca/services/biblioteca.service';
import { ReservaLibroService } from './../../biblioteca/services/reserva-libro.service';
import { CreateLibroDto, UpdateLibroDto } from '../dtos/libro.dto';

@Injectable()
@Injectable()
export class LibroService {
  constructor(
    private autorService: AutorService,
    private bibliotecaService: BibliotecaService,
    private reservaLibroService: ReservaLibroService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Libro) private libroRep: Repository<Libro>,
  ) {}

  findAll() {
    return this.libroRep.find({
      relations: ['autor', 'biblioteca', 'reserva'],
    });
  }

  async findOne(id: number) {
    const libro = await this.libroRep.findOne({
      where: { id: id },
      relations: ['autor', 'reserva', 'biblioteca'],
    });
    if (!libro) {
      throw new NotFoundException(`Libro #${id} not found`);
    }
    return libro;
  }

  async create(data: CreateLibroDto) {
    const newLibro = this.libroRep.create(data);
    if (data.idAutor) {
      const autor = await this.autorService.findOne(data.idAutor);
      newLibro.autor = autor;
    }
    if (data.idBiblioteca) {
      const biblioteca = await this.bibliotecaService.findOne(
        data.idBiblioteca,
      );
      newLibro.biblioteca = biblioteca;
    }
    if (data.idReserva) {
      const reserva = await this.reservaLibroService.findOne(data.idReserva);
      newLibro.reserva = reserva;
    }
    return this.libroRep.save(newLibro);
  }

  async update(id: number, changes: UpdateLibroDto) {
    const libro = await this.libroRep.findOneBy({ id: id });
    if (changes.idAutor) {
      const autor = await this.autorService.findOne(changes.idAutor);
      libro.autor = autor;
    }
    if (changes.idBiblioteca) {
      const biblioteca = await this.bibliotecaService.findOne(
        changes.idBiblioteca,
      );
      libro.biblioteca = biblioteca;
    }
    if (changes.idReserva) {
      const reserva = await this.reservaLibroService.findOne(changes.idReserva);
      libro.reserva = reserva;
    }
    this.libroRep.merge(libro, changes);
    return this.libroRep.save(libro);
  }

  delete(id: number) {
    return this.libroRep.delete(id);
  }
}
