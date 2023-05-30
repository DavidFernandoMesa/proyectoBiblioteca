import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsEmail,
  Length,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePersonaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly edad: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly biblioteca: number;
}

export class UpdatePersonaDto extends PartialType(CreatePersonaDto) {}
