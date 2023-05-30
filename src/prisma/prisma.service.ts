import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private prisma: PrismaClient;
  libro: PrismaClient['libro']; // Agrega la propiedad libro
  autor: PrismaClient['autor']; // Agrega la propiedad libro
  biblioteca: PrismaClient['biblioteca']; // Agrega la propiedad biblioteca
  persona: PrismaClient['persona']; // Agrega la propiedad persona
  reservaLibro: PrismaClient['reservaLibro']; // Agrega la propiedad persona

  constructor() {
    this.prisma = new PrismaClient();
    this.libro = this.prisma.libro; // Asigna la propiedad libro
    this.autor = this.prisma.autor; // Asigna la propiedad libro
    this.biblioteca = this.prisma.biblioteca; // Asigna la propiedad biblioteca
    this.persona = this.prisma.persona; // Asigna la propiedad persona
    this.reservaLibro = this.prisma.reservaLibro; // Asigna la propiedad persona
  }

  getPrisma(): PrismaClient {
    return this.prisma;
  }
}
