export class Espacio {
    id: string;
    nombre: string;
    horarios: string;
    aforo: number;
    zona: string;
    imagen: string;
    deporte: string;

    constructor(id: string, nombre: string, horarios: string, aforo: number, zona: string, imagen: string, deporte: string) {
        this.id = id;
        this.nombre = nombre;
        this.horarios = horarios;
        this.aforo = aforo;
        this.zona = zona;
        this.imagen = imagen;
        this.deporte = deporte;
      }

  }
  