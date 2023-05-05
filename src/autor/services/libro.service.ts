import { Injectable, NotFoundException } from '@nestjs/common';
import { Libro } from '../entities/libro.entity';
import { AutorService } from './autor.service';
import { BibliotecaService } from './../../biblioteca/services/biblioteca.service';
import { CreateLibroDto, UpdateLibroDto } from '../dtos/libro.dto';

@Injectable()
@Injectable()
export class LibroService {
  private counterId = 1;
  constructor(
    private autorService: AutorService,
    private bibliotecaService: BibliotecaService,
  ) {}
  private libro: Libro[] = [
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autorId: 1,
      autor: {
        id: 1,
        nombre: 'Gabriel García Márquez',
        edad: '87',
        nacionalidad: 'Colombiano',
        genero: 'Masculino',
        obras_publicadas: [],
      },
      genero: 'Novela',
      sinopsis:
        'Entre la boda de José Arcadio Buendía con Amelia Iguarán hasta la maldición de Aureliano Babilonia transcurre todo un siglo. Cien años de soledad para una estirpe única, fantástica, capaz de fundar una ciudad tan especial como Macondo y de engendrar niños con cola de cerdo.',
      idioma: 'Español',
      formato: 'Digital y Fisico',
      anio_publicacion: new Date('2023-05-05T00:00:00.000Z'),
    },
  ];

  findAll() {
    return this.libro;
  }

  findOne(id: number) {
    // Busca el libro dentro del arreglo 'libro' que tenga un id igual al proporcionado
    const libro = this.libro.find((item) => item.id === id);

    // Si no encuentra el libro, lanza una excepción 'NotFoundException' con un mensaje personalizado
    if (!libro) {
      throw new NotFoundException(`Libro #${id} not found`);
    }

    // Obtiene el autor del libro utilizando el servicio 'autorService' y el autorId del libro encontrado anteriormente
    const autor = this.autorService.findOne(libro.autorId);

    /* Retorna un objeto que contiene la información del libro encontrado y su autor,
    utilizando el operador spread para desestructurar y copiar los valores del objeto 'libro', y agregando la información del autor obtenida anteriormente*/
    return { ...libro, autor };
  }

  create(data: CreateLibroDto) {
    // Aumenta el contador del ID para el nuevo libro que se va a crear
    this.counterId = this.counterId + 1;
    // Busca el autor correspondiente al ID proporcionado en los datos de entrada
    const autor = this.autorService.findOne(data.autorId);
    // Si no se encuentra un autor con el ID proporcionado, lanza una excepción
    if (!autor) {
      throw new NotFoundException(`Autor #${data.autorId} not found`);
    }
    // Crea un nuevo objeto de libro con los datos proporcionados y el autor encontrado
    const newLibro = {
      id: this.counterId,
      autor: {
        id: autor.id,
        nombre: autor.nombre,
        edad: autor.edad,
        nacionalidad: autor.nacionalidad,
        genero: autor.genero,
      },
      ...data,
    };
    // Agrega el nuevo libro al arreglo de libros existente
    this.libro.push(newLibro);
    // Agrega el nuevo libro al arreglo de obras publicadas del autor correspondiente
    autor.obras_publicadas = autor.obras_publicadas || [];
    autor.obras_publicadas.push(newLibro);
    // Agregar el nuevo libro al arreglo de libros de la biblioteca
    this.bibliotecaService.agregarLibro(newLibro);
    // Devuelve una copia JSON del objeto de libro creado
    return JSON.parse(JSON.stringify(newLibro));
  }

  update(id: number, changes: UpdateLibroDto) {
    const libro = this.findOne(id); // Busca el libro con el id dado
    const index = this.libro.findIndex((item) => item.id === id); // Busca el índice del libro a actualizar en el array de libros
    this.libro[index] = {
      ...libro, // Copia todos los atributos del libro encontrado
      ...changes, // Sobrescribe los atributos especificados en el objeto de cambios
    };
    return this.libro[index]; // Devuelve el libro actualizado
  }

  delete(id: number) {
    const index = this.libro.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Libro #${id} not found`);
    }
    this.libro.splice(index, 1);
    return true;
  }
}
