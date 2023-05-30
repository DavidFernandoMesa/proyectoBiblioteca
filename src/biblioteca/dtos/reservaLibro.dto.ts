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
  @ApiProperty({ required: false })
  readonly persona?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly fecha_prestamo: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly fecha_devolucion: Date;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly reservado: boolean;
}

export class UpdateLibroReservaDto extends PartialType(CreateLibroReservaDto) {}
