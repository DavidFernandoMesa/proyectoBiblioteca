import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { ReservaLibro } from '../entities/reservaLibro.entity';
import {
  CreateLibroReservaDto,
  UpdateLibroReservaDto,
} from '../dtos/reservaLibro.dto';

import { PersonaService } from './persona.service';
import { Libro } from 'src/autor/entities/libro.entity';

@Injectable()
export class ReservaLibroService {
  constructor(
    private personaService: PersonaService,
    // @InjectRepository(Libro)
    // private libroRep: Repository<Libro>,
    @InjectRepository(ReservaLibro)
    private reservaRep: Repository<ReservaLibro>,
  ) {}

  findAll() {
    return this.reservaRep.find({
      relations: ['libros', 'persona'],
    });
  }

  async findOne(id: number) {
    const reservaLibro = await this.reservaRep.findOne({
      where: { id: id },
      relations: ['libros', 'persona'],
    });
    if (!reservaLibro) {
      throw new NotFoundException(`Reserva #${id} not found`);
    }
    return reservaLibro;
  }

  async create(data: CreateLibroReservaDto) {
    const newLibroReserva = this.reservaRep.create(data);
    if (data.idPersona) {
      const persona = await this.personaService.findOne(data.idPersona);
      newLibroReserva.persona = persona;
    }

    // if (data.idLibros) {
    //   const libros = await this.libroRep.findBy({
    //     id: In(data.idLibros),
    //   });
    //   newLibroReserva.libros = libros;
    // }
    return this.reservaRep.save(newLibroReserva);
  }

  async update(id: number, changes: UpdateLibroReservaDto) {
    const reservaLibro = await this.reservaRep.findOneBy({ id: id });
    this.reservaRep.merge(reservaLibro, changes);
    return this.reservaRep.save(reservaLibro);
  }

  async removeLibroByReserva(idReserva: number, idLibro: number) {
    const reserva = await this.reservaRep.findOne({
      where: { id: idReserva },
      relations: ['libros', 'persona'],
    });
    reserva.libros = reserva.libros.filter((item) => item.id !== idLibro);
    return this.reservaRep.save(reserva);
  }

  // async addLibroByReserva(idReserva: number, idLibro: number) {
  //   const reserva = await this.reservaRep.findOne({
  //     where: { id: idReserva },
  //     relations: ['libros', 'persona'],
  //   });
  //   const libro = await this.libroRep.findOne({ where: { id: idLibro } });
  //   reserva.libros.push(libro);
  //   return this.reservaRep.save(reserva);
  // }

  remove(id: number) {
    return this.reservaRep.delete(id);
  }
}
