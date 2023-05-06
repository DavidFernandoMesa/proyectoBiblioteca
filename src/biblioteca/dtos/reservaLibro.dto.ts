import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { Autor } from './../../autor/entities/autor.entity';
import { Libro } from './../../autor/entities/libro.entity';

export class CreateLibroReservaDto {
  readonly id_persona: number;
  readonly id_libros: [];
  readonly libros: Libro[];
  readonly persona: Autor;
  readonly fecha_prestamo: Date;
  readonly fecha_devolucion: Date;

  @IsBoolean()
  @IsNotEmpty()
  readonly reservado: boolean;
}

export class UpdateLibroReservaDto extends PartialType(CreateLibroReservaDto) {}
