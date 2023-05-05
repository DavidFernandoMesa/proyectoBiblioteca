import { IsNotEmpty, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBibliotecaDto {
  @IsNotEmpty()
  @IsArray()
  readonly libros: [];

  @IsNotEmpty()
  @IsArray()
  readonly personas: [];
}

export class UpdateBibliotecaDto extends PartialType(CreateBibliotecaDto) {}
