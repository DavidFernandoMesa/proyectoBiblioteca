import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Persona } from '../entities/persona.entity';
import { CreatePersonaDto, UpdatePersonaDto } from '../dtos/persona.dto';
import { Biblioteca } from '../entities/biblioteca.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona) private personaRep: Repository<Persona>,
    @InjectRepository(Biblioteca) private bibliotecaRep: Repository<Biblioteca>,
  ) {}

  findAll() {
    return this.personaRep.find({
      relations: ['biblioteca'],
    });
  }

  async findOne(id: number) {
    const persona = await this.personaRep.findOne({
      where: { id: id },
      relations: ['biblioteca'],
    });
    if (!persona) {
      throw new NotFoundException(`Persona #${id} not found`);
    }
    return persona;
  }

  findByEmail(email) {
    return this.personaRep.findOne({ where: { email } });
  }

  async create(data: CreatePersonaDto) {
    const newPersona = await this.personaRep.create(data);
    const hashPassword = await bcrypt.hash(newPersona.password, 10);
    newPersona.password = hashPassword;
    if (data.idBiblioteca) {
      const biblioteca = await this.bibliotecaRep.findOne({
        where: { id: data.idBiblioteca },
      });
      newPersona.biblioteca = biblioteca;
    }
    return this.personaRep.save(newPersona);
  }

  async update(id: number, changes: UpdatePersonaDto) {
    const persona = await this.personaRep.findOneBy({ id });
    if (changes.idBiblioteca) {
      const biblioteca = await this.bibliotecaRep.findOne({
        where: { id: changes.idBiblioteca },
      });
      persona.biblioteca = biblioteca;
    }
    this.personaRep.merge(persona, changes);
    return this.personaRep.save(persona);
  }

  remove(id: number) {
    return this.personaRep.delete(id);
  }
}
