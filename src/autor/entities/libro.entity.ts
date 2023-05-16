import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Autor } from './autor.entity';
import { ReservaLibro } from './../../biblioteca/entities/reservaLibro.entity';
import { Biblioteca } from './../../biblioteca/entities/biblioteca.entity';

@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  titulo: string;

  @Column({ type: 'varchar' })
  genero: string;

  @Column({ type: 'text' })
  sinopsis: string;

  @Column({ type: 'varchar' })
  idioma: string;

  @Column({ type: 'varchar' })
  formato: string;

  @Column({ type: 'date' })
  anio_publicacion: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Autor, (autor) => autor.obras_publicadas)
  autor: Autor;

  @ManyToOne(() => ReservaLibro, (reserva) => reserva.libros)
  reserva: ReservaLibro;

  @ManyToOne(() => Biblioteca, (biblioteca) => biblioteca.libros)
  biblioteca: Biblioteca;
}
