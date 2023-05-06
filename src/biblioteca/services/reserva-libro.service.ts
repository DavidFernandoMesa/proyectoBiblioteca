import { Injectable, NotFoundException } from '@nestjs/common';
import { ReservaLibro } from '../entities/reservaLibro.entity';
import {
  CreateLibroReservaDto,
  UpdateLibroReservaDto,
} from '../dtos/reservaLibro.dto';

import { Libro } from './../../autor/entities/libro.entity';
import { LibroService } from './../../autor/services/libro.service';
import { AutorService } from './../../autor/services/autor.service';

@Injectable()
export class ReservaLibroService {
  private counterId = 1;
  constructor(
    private libroService: LibroService,
    private autorService: AutorService,
  ) {}
  private libroReserva: ReservaLibro[] = [
    {
      id: 1,
      id_persona: 1,
      id_libros: [],
      libros: [
        {
          id: 1,
          titulo: 'Cien años de soledad',
          autorId: 1,
          autor: {
            id: 1,
            nombre: 'Gabriel García Márquez',
            edad: '87',
            nacionalidad: 'Colombiano',
            genero: 'Masculino',
            obras_publicadas: [],
          },
          genero: 'Novela',
          sinopsis:
            'Entre la boda de José Arcadio Buendía con Amelia Iguarán hasta la maldición de Aureliano Babilonia transcurre todo un siglo. Cien años de soledad para una estirpe única, fantástica, capaz de fundar una ciudad tan especial como Macondo y de engendrar niños con cola de cerdo.',
          idioma: 'Español',
          formato: 'Digital y Fisico',
          anio_publicacion: new Date('2023-05-05T00:00:00.000Z'),
        },
      ],
      persona: {
        id: 1,
        nombre: 'Gabriel García Márquez',
        edad: '87',
        nacionalidad: 'Colombiano',
        genero: 'Masculino',
        obras_publicadas: [],
      },
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

  async create(data: CreateLibroReservaDto) {
    this.counterId = this.counterId + 1;

    // Busca la información de la persona que hizo la reserva.
    const persona = await this.autorService.findOne(data.id_persona);

    // Crea un array vacío que contendrá los libros que se van a reservar.
    const libros = [];

    // Recorre los IDs de los libros que se van a reservar y busca su información completa.
    for (const libroId of Array.isArray(data.id_libros)
      ? data.id_libros
      : [data.id_libros]) {
      const libro = await this.libroService.findOne(libroId);
      libros.push(libro);
    }

    // Crea un objeto con la información de la nueva reserva.
    const newReserva = {
      id: this.counterId,
      ...data,
      libros: libros,
      persona: persona,
    };

    // Agrega la nueva reserva al array de reservas.
    this.libroReserva.push(newReserva);

    // Devuelve la información completa de la nueva reserva.
    return newReserva;
  }

  update(id: number, changes: UpdateLibroReservaDto) {
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
