import { Libro } from './../../autor/entities/libro.entity';
import { Autor } from './../../autor/entities/autor.entity';
export class Biblioteca {
  id: number;
  libros: Array<Libro>;
  personas: Array<Autor>;
}
