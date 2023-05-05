import { Autor } from './autor.entity';
export class Libro {
  id: number;
  titulo: string;
  autorId: number;
  autor: Autor;
  genero: string;
  sinopsis: string;
  idioma: string;
  formato: string;
  anio_publicacion: Date;
}
