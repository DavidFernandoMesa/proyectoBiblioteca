import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

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
