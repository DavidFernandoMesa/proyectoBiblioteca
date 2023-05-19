import { PartialType } from '@nestjs/mapped-types';

export class CreateBibliotecaDto {}

export class UpdateBibliotecaDto extends PartialType(CreateBibliotecaDto) {}
