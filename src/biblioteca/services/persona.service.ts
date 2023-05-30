import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Persona } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { CreatePersonaDto, UpdatePersonaDto } from '../dtos/persona.dto';

@Injectable()
export class PersonaService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Persona[]> {
    return this.prisma.persona.findMany({
      include: {
        biblioteca: true,
      },
    });
  }

  async findOne(id: number): Promise<Persona | null> {
    const persona = await this.prisma.persona.findUnique({
      where: { id },
      include: {
        biblioteca: true,
      },
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${id} not found`);
    }
    return persona;
  }

  async findByEmail(email: string): Promise<Persona | null> {
    return this.prisma.persona.findFirst({
      where: { email: { equals: email } },
    });
  }

  async create(data: CreatePersonaDto): Promise<Persona> {
    // Verificar si la biblioteca existe
    const bibliotecaExists = await this.prisma.biblioteca.findUnique({
      where: { id: data.biblioteca },
    });

    if (!bibliotecaExists) {
      throw new NotFoundException(`Biblioteca #${data.biblioteca} not found`); // Lanzar un error si la biblioteca no existe
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const newData: Prisma.PersonaCreateInput = {
      nombre: data.nombre,
      edad: data.edad,
      email: data.email,
      password: hashPassword,
      role: data.role,
      biblioteca: {
        connect: { id: data.biblioteca },
      },
    };

    return this.prisma.persona.create({
      data: newData,
    });
  }

  async update(id: number, changes: UpdatePersonaDto): Promise<Persona> {
    const persona = await this.prisma.persona.findUnique({
      where: { id },
    });

    if (!persona) {
      throw new NotFoundException(`Persona #${id} not found`);
    }

    const updateData: Prisma.PersonaUpdateInput = {};

    if (changes.biblioteca) {
      const biblioteca = await this.prisma.biblioteca.findUnique({
        where: { id: changes.biblioteca },
      });

      if (!biblioteca) {
        throw new NotFoundException(
          `Biblioteca #${changes.biblioteca} not found`,
        );
      }

      updateData.biblioteca = {
        connect: { id: biblioteca.id },
      };
    }

    return this.prisma.persona.update({
      where: { id },
      data: {
        ...changes,
        biblioteca: { connect: { id: changes.biblioteca } },
      },
    });
  }

  async remove(id: number): Promise<{ message: string } | null> {
    await this.prisma.persona.delete({
      where: { id },
    });

    return { message: 'Se eliminó correctamente la persona.' };
  }
}
