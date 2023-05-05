export class Espacio {
    nombre: string;
    hora_inicio: string;
    hora_fin: string;
    aforo: number;
    zona: string;
    deporte: string;

  
    constructor(nombre: string, hora_inicio: string, hora_fin: string, aforo: number, zona: string, deporte: string) {
      this.nombre = nombre;
      this.hora_inicio = hora_inicio;
      this.hora_inicio = hora_inicio;
      this.hora_fin = hora_fin;
      this.aforo = aforo;
      this.zona = zona;
      this.deporte = deporte;
    }
}