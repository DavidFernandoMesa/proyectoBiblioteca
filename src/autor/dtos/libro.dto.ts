import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { InputType, Field } from '@nestjs/graphql';

export class CreateLibroDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly genero: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly sinopsis: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly idioma: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly formato: string;

  @IsString()
  @ApiProperty()
  readonly anio_publicacion: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly idAutor: number;

  @ApiProperty()
  readonly idReserva: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly idBiblioteca: number;
}

export class UpdateLibroDto extends PartialType(CreateLibroDto) {}

@InputType()
export class FilterLibros {
  @Field({ nullable: true })
  @IsOptional()
  @IsPositive()
  limit?: number;

  @Field({ nullable: true })
  @IsOptional()
  @Min(0)
  offset?: number;
}
