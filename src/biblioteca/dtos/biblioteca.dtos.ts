import { IsNotEmpty, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBibliotecaDtos {
  @IsNotEmpty()
  @IsArray()
  readonly libros: [];

  @IsNotEmpty()
  @IsArray()
  readonly personas: [];
}

export class UpdateBibliotecaDtos extends PartialType(CreateBibliotecaDtos) {}
