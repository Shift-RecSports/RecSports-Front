export class Espacio {
    id: string;
    nombre: string;
    hora_inicio: string;
    hora_fin: string;
    aforo: string;
    zona: string;
    imagen: string;
    deporte: string;

    constructor(id: string, nombre: string, hora_inicio: string, hora_fin: string, aforo: string, zona: string, imagen: string, deporte: string) {
        this.id = id;
        this.nombre = nombre;
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.aforo = aforo;
        this.zona = zona;
        this.imagen = imagen;
        this.deporte = deporte;
      }

  }
  