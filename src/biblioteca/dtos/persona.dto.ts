import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateBibliotecaDto } from './biblioteca.dto';

export class CreatePersonaDto {
  readonly biblioteca: CreateBibliotecaDto;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly edad: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly idBiblioteca: number;
}

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {}
