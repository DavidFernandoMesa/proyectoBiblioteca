import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAutorDtos {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly edad: string;

  @IsString()
  @IsNotEmpty()
  readonly nacionalidad: string;

  @IsString()
  @IsNotEmpty()
  readonly genero: string;

  @IsArray()
  @IsNotEmpty()
  readonly obras_publicadas: [];
}

export class UpdateAutorDtos extends PartialType(CreateAutorDtos) {}
