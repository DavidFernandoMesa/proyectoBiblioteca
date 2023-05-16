import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly edad: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nacionalidad: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly genero: string;
}

export class UpdateAutorDto extends PartialType(CreateAutorDto) {}
