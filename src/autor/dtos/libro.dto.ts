import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  IsDate,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLibroDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly titulo: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly genero: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly sinopsis: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly idioma: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly formato: string;

  @Field()
  @IsDate()
  @ApiProperty()
  readonly anio_publicacion: Date;

  @Field()
  @IsPositive()
  @ApiProperty()
  readonly idAutor: number;

  @Field()
  @IsPositive()
  @ApiProperty()
  readonly idReserva: number;

  @Field()
  @IsPositive()
  @ApiProperty()
  readonly idBiblioteca: number;
}

@InputType()
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
