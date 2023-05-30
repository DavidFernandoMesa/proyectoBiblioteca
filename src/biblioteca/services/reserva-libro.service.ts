import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ReservaLibro } from '@prisma/client';

import {
  CreateLibroReservaDto,
  UpdateLibroReservaDto,
} from '../dtos/reservaLibro.dto';

@Injectable()
export class ReservaLibroService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<ReservaLibro[]> {
    return this.prisma.reservaLibro.findMany({
      include: { libros: true, persona: true },
    });
  }

  async findOne(id: number): Promise<ReservaLibro | null> {
    const reservaLibro = await this.prisma.reservaLibro.findUnique({
      where: { id },
      include: { libros: true, persona: true },
    });
    if (!reservaLibro) {
      throw new NotFoundException(`Reserva #${id} not found`);
    }
    return reservaLibro;
  }

  async create(data: CreateLibroReservaDto): Promise<ReservaLibro> {
    const fechaP = new Date(data.fecha_prestamo);
    const fechaD = new Date(data.fecha_devolucion);

    const persona = await this.prisma.persona.findUnique({
      where: { id: data.persona },
    });

    if (!persona) {
      throw new NotFoundException(`Persona #${data.persona} not found`);
    }

    const newReservaLibro = await this.prisma.reservaLibro.create({
      data: {
        ...data,
        fecha_prestamo: fechaP,
        fecha_devolucion: fechaD,
        persona: {
          connect: { id: data.persona },
        },
      },
      include: { persona: true },
    });

    return newReservaLibro;
  }

  async update(
    id: number,
    changes: UpdateLibroReservaDto,
  ): Promise<ReservaLibro> {
    const { persona, ...restChanges } = changes; // Extraemos la propiedad persona del objeto changes

    const updatedReservaLibro = await this.prisma.reservaLibro.update({
      where: { id },
      data: {
        ...restChanges, // Utilizamos el resto de los cambios (sin la propiedad persona)
        persona: {
          connect: { id: persona }, // Conectamos la persona utilizando el ID
        },
      },
      include: { persona: true },
    });

    return updatedReservaLibro;
  }

  async removeLibroByReserva(
    idReserva: number,
    idLibro: number,
  ): Promise<ReservaLibro> {
    const updatedReservaLibro = await this.prisma.reservaLibro.update({
      where: { id: idReserva },
      data: {
        libros: {
          disconnect: { id: idLibro }, // Desconectar el libro del array de libros
        },
      },
      include: { persona: true },
    });

    return updatedReservaLibro;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.prisma.reservaLibro.delete({
      where: { id },
    });

    return { message: 'Se eliminó correctamente la reserva de libro.' };
  }
}
