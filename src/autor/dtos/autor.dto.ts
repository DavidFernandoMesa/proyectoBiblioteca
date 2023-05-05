import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAutorDto {
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

  readonly obras_publicadas: [];
}

export class UpdateAutorDto extends PartialType(CreateAutorDto) {}
