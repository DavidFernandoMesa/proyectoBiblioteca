import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Autor } from './../entities/autor.entity';

export class CreateLibroDto {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly autorId: number;

  readonly autor: Autor;

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

export class UpdateLibroDto extends PartialType(CreateLibroDto) {}
