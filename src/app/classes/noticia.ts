export class Noticia {
    id: string;
    fecha: string;
    horario: string;
    url: string;
    imagen: string;
    
    constructor(id: string, fecha: string, horario: string, url: string, imagen: string) {
      this.id = id;
      this.fecha = fecha;
      this.horario = horario;
      this.url = url;
      this.imagen = imagen;
    }
}