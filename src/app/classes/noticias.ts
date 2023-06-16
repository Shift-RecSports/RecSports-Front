// NOTICIA
export class Noticia {
  id: string;
  lugar: string;
  fecha: string;
  hora: string;
  titulo: string;
  imagen: string;
  url: string;

  constructor(
    id: string,
    lugar: string,
    fecha: string,
    hora: string,
    titulo: string,
    imagen: string,
    url: string
  ) {
    this.id = id;
    this.lugar = lugar;
    this.fecha = fecha;
    this.hora = hora;
    this.titulo = titulo;
    this.imagen = imagen;
    this.url = url;
  }
}
