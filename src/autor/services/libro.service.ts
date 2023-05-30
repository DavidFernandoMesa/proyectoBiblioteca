import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

import {
  CreateLibroDto,
  UpdateLibroDto,
  FilterLibros,
} from '../dtos/libro.dto';

@Injectable()
export class LibroService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: FilterLibros) {
    const { limit, offset } = params || {};
    return this.prisma.libro.findMany({
      take: limit,
      skip: offset,
      include: { autor: true, biblioteca: true, reserva: true },
    });
  }

  async findOne(id: number) {
    const libro = await this.prisma.libro.findUnique({
      where: { id },
      include: { autor: true, reserva: true, biblioteca: true },
    });
    if (!libro) {
      throw new NotFoundException(`Libro #${id} not found`);
    }
    return libro;
  }

  async create(data: CreateLibroDto) {
    const { idAutor, idBiblioteca, idReserva, ...rest } = data;
    const fecha = new Date(rest.anio_publicacion);
    const libroData: Prisma.LibroCreateInput = {
      ...rest,
      anio_publicacion: fecha,
      autor: { connect: { id: idAutor } },
      biblioteca: { connect: { id: idBiblioteca } },
      reserva: undefined,
    };

    if (idReserva) {
      const reserva = await this.prisma.reservaLibro.findUnique({
        where: { id: idReserva },
      });

      if (!reserva) {
        throw new NotFoundException(`Reserva #${idReserva} not found`);
      }

      libroData.reserva = {
        connect: { id: idReserva },
      };
    }

    const autor = await this.prisma.autor.findUnique({
      where: { id: idAutor },
    });
    if (!autor) {
      throw new NotFoundException(`Autor #${idAutor} not found`);
    }

    const biblioteca = await this.prisma.biblioteca.findUnique({
      where: { id: idBiblioteca },
    });
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca #${idBiblioteca} not found`);
    }

    const createdLibro = await this.prisma.libro.create({
      data: libroData,
    });

    return createdLibro;
  }

  async update(id: number, changes: UpdateLibroDto) {
    const { idAutor, idBiblioteca, idReserva, ...rest } = changes;

    let updateData: Prisma.LibroUpdateInput = {
      ...rest,
      autor: idAutor ? { connect: { id: idAutor } } : undefined,
      biblioteca: idBiblioteca ? { connect: { id: idBiblioteca } } : undefined,
      reserva: undefined, // Removemos la actual conexión con la reserva existente
    };

    if (idReserva) {
      updateData = {
        ...updateData,
        reserva: {
          connect: { id: idReserva },
        },
      };
    }

    const existingLibro = await this.prisma.libro.findUnique({ where: { id } });

    if (!existingLibro) {
      throw new NotFoundException('El libro no existe.');
    }

    const libro = await this.prisma.libro.update({
      where: { id },
      data: updateData,
      include: {
        autor: true,
        biblioteca: true,
        reserva: true,
      },
    });

    return libro;
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.prisma.libro.delete({
      where: { id },
    });

    return { message: 'Se eliminó correctamente el libro.' };
  }
}
