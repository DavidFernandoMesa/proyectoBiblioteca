import { Libro } from './libro.entity';
export class Autor {
  id: number;
  nombre: string;
  edad: string;
  nacionalidad: string;
  genero: string;
  obras_publicadas: Libro[];
}
