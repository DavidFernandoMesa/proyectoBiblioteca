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

import { Autor } from './autor.entity';
import { ReservaLibro } from './../../biblioteca/entities/reservaLibro.entity';
import { Biblioteca } from './../../biblioteca/entities/biblioteca.entity';

@Entity({ name: 'libros' })
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
