import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAutorDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombre: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly edad: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nacionalidad: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly genero: string;
}

@InputType()
export class UpdateAutorDto extends PartialType(CreateAutorDto) {}
