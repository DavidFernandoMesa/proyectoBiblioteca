import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Biblioteca } from './biblioteca.entity';
import { ReservaLibro } from './reservaLibro.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'personas' })
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  edad: string;

  @Column({ type: 'varchar' })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Exclude()
  @Column({ type: 'varchar' })
  role: string;

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

  @ManyToOne(() => Biblioteca, (biblioteca) => biblioteca.personas)
  @JoinColumn({ name: 'biblioteca_id' })
  biblioteca: Biblioteca;

  @OneToMany(() => ReservaLibro, (reserva) => reserva.persona)
  reserva: ReservaLibro;
}
