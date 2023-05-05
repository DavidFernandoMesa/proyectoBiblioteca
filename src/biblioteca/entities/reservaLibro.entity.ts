import { Libro } from './../../autor/entities/libro.entity';
export class ReservaLibro {
  id: number;
  libros: Libro[];
  persona: string;
  fecha_prestamo: Date;
  fecha_devolucion: Date;
  reservado: boolean;
}
