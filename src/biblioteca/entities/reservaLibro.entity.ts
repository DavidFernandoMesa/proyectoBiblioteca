import { Libro } from './../../autor/entities/libro.entity';
import { Autor } from './../../autor/entities/autor.entity';
export class ReservaLibro {
  id: number;
  id_persona: number;
  id_libros: [];
  libros: Libro[];
  persona: Autor;
  fecha_prestamo: Date;
  fecha_devolucion: Date;
  reservado: boolean;
}
