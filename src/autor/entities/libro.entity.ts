import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsDate } from 'class-validator';

import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Autor } from './autor.entity';
import { ReservaLibro } from './../../biblioteca/entities/reservaLibro.entity';
import { Biblioteca } from './../../biblioteca/entities/biblioteca.entity';

@Entity({ name: 'libros' })
@ObjectType()
export class Libro {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', unique: true })
  @Field()
  titulo: string;

  @Column({ type: 'varchar' })
  @Field()
  genero: string;

  @Column({ type: 'text' })
  @Field()
  sinopsis: string;

  @Column({ type: 'varchar' })
  @Field()
  idioma: string;

  @Column({ type: 'varchar' })
  @Field()
  formato: string;

  @Column({ type: 'date' })
  @Field({
    nullable: true,
  })
  @IsDate()
  anio_publicacion: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Autor, (autor) => autor.obras_publicadas)
  @JoinColumn({ name: 'autor_id' })
  autor: Autor;

  @ManyToOne(() => ReservaLibro, (reserva) => reserva.libros)
  @JoinColumn({ name: 'reserva_id' })
  reserva: ReservaLibro;

  @ManyToOne(() => Biblioteca, (biblioteca) => biblioteca.libros)
  @JoinColumn({ name: 'biblioteca_id' })
  biblioteca: Biblioteca;
}
