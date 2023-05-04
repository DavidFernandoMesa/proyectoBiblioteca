import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservaLibro } from '../entities/reservaLibro.entity';
import {
  CreateLibroReservaDtos,
  UpdateLibroReservaDtos,
} from '../dtos/reservaLibro.dtos';

@Injectable()
export class ReservaLibroService {
  private counterId = 1;
  private libroReserva: ReservaLibro[] = [
    {
      id: 1,
      libros: ['Cien años de soledad, La hojarasca'],
      persona: 'David Fernando',
      fecha_prestamo: new Date(2020, 4, 29),
      fecha_devolucion: new Date(2023, 6, 12),
      reservado: true,
    },
  ];

  findAll() {
    return this.libroReserva;
  }

  findOne(id: number) {
    const reservaLibro = this.libroReserva.find((item) => item.id === id);
    if (!reservaLibro) {
      throw new NotFoundException(`Reserva #${id} not found`);
    }
    return reservaLibro;
  }

  create(data: CreateLibroReservaDtos) {
    this.counterId = this.counterId + 1;
    const newReserva = {
      id: this.counterId,
      ...data,
    };
    this.libroReserva.push(newReserva);
    return newReserva;
  }

  update(id: number, changes: UpdateLibroReservaDtos) {
    const reserva = this.findOne(id);
    const index = this.libroReserva.findIndex((item) => item.id === 1);
    this.libroReserva[index] = {
      ...reserva,
      ...changes,
    };
    return this.libroReserva[index];
  }

  remove(id: number) {
    const index = this.libroReserva.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Reserva #${id} not found`);
    }
    this.libroReserva.splice(index, 1);
    return true;
  }
}
