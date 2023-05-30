import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Autor } from '@prisma/client';

import { CreateAutorDto, UpdateAutorDto } from '../../autor/dtos/autor.dto';

@Injectable()
export class AutorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Autor[]> {
    return this.prisma.autor.findMany({
      include: { obras_publicadas: true },
    });
  }

  async findOne(id: number): Promise<Autor | null> {
    const autor = await this.prisma.autor.findUnique({
      where: { id },
      include: { obras_publicadas: true },
    });
    if (!autor) {
      throw new NotFoundException(`Autor #${id} not found`);
    }
    return autor;
  }

  async create(data: CreateAutorDto): Promise<Autor> {
    return this.prisma.autor.create({
      data: {
        ...data,
      },
    });
  }

  async update(id: number, changes: UpdateAutorDto): Promise<Autor> {
    const autor = await this.findOne(id);
    return this.prisma.autor.update({
      where: { id },
      data: {
        ...changes,
      },
    });
  }

  async removeLibroByAutor(idAutor: number, idLibro: number): Promise<Autor> {
    const updatedAutor = await this.prisma.autor.update({
      where: { id: idAutor },
      data: {
        obras_publicadas: {
          disconnect: { id: idLibro }, // Desconectar el libro del array de obras_publicadas
        },
      },

      include: { obras_publicadas: true },
    });

    return updatedAutor;
  }

  // async removeLibroByAutor(idAutor: number, idLibro: number): Promise<Autor> {
  //   const autor = await this.prisma.autor.findUnique({
  //     where: { id: idAutor },
  //     include: { obras_publicadas: true },
  //   });

  //   if (!autor) {
  //     throw new NotFoundException(`Autor #${idAutor} not found`);
  //   }

  //   const updatedObrasPublicadas = autor.obras_publicadas.filter(
  //     (libro) => libro.id !== idLibro,
  //   );

  //   return this.prisma.autor.update({
  //     where: { id: idAutor },
  //     data: {
  //       obras_publicadas: {
  //         set: updatedObrasPublicadas.map((libro) => ({ id: libro.id })),
  //       },
  //     },
  //     include: { obras_publicadas: true },
  //   });
  // }

  async addLibroByAutor(idAutor: number, idLibro: number): Promise<Autor> {
    const autor = await this.findOne(idAutor);
    const libro = await this.prisma.libro.findUnique({
      where: { id: idLibro },
    });
    if (!libro) {
      throw new NotFoundException(`Libro #${idLibro} not found`);
    }
    return this.prisma.autor.update({
      where: { id: idAutor },
      data: {
        obras_publicadas: {
          connect: { id: idLibro },
        },
      },
      include: { obras_publicadas: true },
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const autor = await this.findOne(id);
    await this.prisma.autor.delete({
      where: { id },
    });

    return { message: 'Se eliminó correctamente el autor.' };
  }
}
