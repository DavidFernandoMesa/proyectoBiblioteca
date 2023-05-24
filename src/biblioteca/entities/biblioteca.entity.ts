import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Libro } from './../../autor/entities/libro.entity';
import { Persona } from './persona.entity';

@Entity({ name: 'bibliotecas' })
export class Biblioteca {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => Libro, (libros) => libros.biblioteca)
  libros: Libro[];

  @OneToMany(() => Persona, (personas) => personas.biblioteca)
  personas: Persona[];
}
