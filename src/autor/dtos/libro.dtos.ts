import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateLibroDtos {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  readonly autor: string;

  @IsString()
  @IsNotEmpty()
  readonly genero: string;

  @IsString()
  @IsNotEmpty()
  readonly sinopsis: string;

  @IsString()
  @IsNotEmpty()
  readonly idioma: string;

  @IsString()
  @IsNotEmpty()
  readonly formato: string;

  @IsDate()
  @IsNotEmpty()
  readonly anio_publicacion: Date;
}

export class UpdateLibroDtos extends PartialType(CreateLibroDtos) {}
