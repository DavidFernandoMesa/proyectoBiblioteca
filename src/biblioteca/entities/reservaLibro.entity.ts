export class ReservaLibro {
  id: number;
  libros: Array<string>;
  persona: string;
  fecha_prestamo: Date;
  fecha_devolucion: Date;
  reservado: boolean;
}
