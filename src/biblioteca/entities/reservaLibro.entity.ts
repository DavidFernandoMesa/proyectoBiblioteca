import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Libro } from './../../autor/entities/libro.entity';
import { Autor } from './../../autor/entities/autor.entity';
import { Persona } from './persona.entity';

@Entity()
export class ReservaLibro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_prestamo: Date;

  @Column({ type: 'date' })
  fecha_devolucion: Date;

  @Column({ type: 'boolean' })
  reservado: boolean;

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

  @ManyToOne(() => Libro, (libros) => libros.reserva)
  libros: Libro[];

  @ManyToOne(() => Persona, (persona) => persona.reserva)
  persona: Persona;
}
