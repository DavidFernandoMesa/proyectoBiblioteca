import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Libro } from './../../autor/entities/libro.entity';
import { Persona } from './persona.entity';

@Entity({ name: 'reservas' })
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
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => Libro, (libros) => libros.reserva)
  libros: Libro[];

  @ManyToOne(() => Persona, (persona) => persona.reserva)
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;
}
