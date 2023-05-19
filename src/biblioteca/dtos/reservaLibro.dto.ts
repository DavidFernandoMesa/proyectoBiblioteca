import {
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsPositive,
  IsArray,
  IsString,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateLibroReservaDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly idPersona: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly idLibros: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fecha_prestamo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fecha_devolucion: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly reservado: boolean;
}

export class UpdateLibroReservaDto extends PartialType(CreateLibroReservaDto) {}
