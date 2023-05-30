import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Importa el servicio de Prisma
import { Prisma, Biblioteca } from '@prisma/client'; // Importa el modelo generado por Prisma

@Injectable()
export class BibliotecaService {
  constructor(private prisma: PrismaService) {} // Inyecta el servicio de Prisma

  async findAll(): Promise<Biblioteca[]> {
    return this.prisma.biblioteca.findMany({
      include: {
        libros: true,
        personas: true,
      },
    });
  }

  async findOne(id: number): Promise<Biblioteca | null> {
    const biblioteca = await this.prisma.biblioteca.findUnique({
      where: { id },
      include: {
        libros: true,
        personas: true,
      },
    });
    if (!biblioteca) {
      throw new NotFoundException(`Biblioteca #${id} not found`);
    }
    return biblioteca;
  }

  async create(data: Prisma.BibliotecaCreateInput): Promise<Biblioteca> {
    return this.prisma.biblioteca.create({
      data,
    });
  }

  async remove(id: number): Promise<{ message: string } | null> {
    const deletedBiblioteca = await this.prisma.biblioteca.delete({
      where: { id },
    });

    if (deletedBiblioteca) {
      return { message: 'Se eliminó correctamente la biblioteca.' };
    }
  }
}
