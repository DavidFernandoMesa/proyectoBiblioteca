import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateLibroReservaDtos {
  @IsArray()
  @IsNotEmpty()
  readonly libros: [];

  @IsString()
  @IsNotEmpty()
  readonly persona: string;

  @IsDate()
  @IsNotEmpty()
  readonly fecha_prestamo: Date;

  @IsDate()
  @IsNotEmpty()
  readonly fecha_devolucion: Date;

  @IsBoolean()
  @IsNotEmpty()
  readonly reservado: boolean;
}

export class UpdateLibroReservaDtos extends PartialType(
  CreateLibroReservaDtos,
) {}
