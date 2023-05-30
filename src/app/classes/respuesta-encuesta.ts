export class RespuestaEncuesta {
  id: string;
  fecha: string;
  calificacion1: number;
  calificacion2: number;
  calificacion3: number;
  tema: string;
  comentario: string;
  
  constructor(id: string, fecha: string, calificacion1: number, calificacion2: number, tema: string, calificacion3: number, comentario: string) {
    this.id = id;
    this.fecha = fecha;
    this.calificacion1 = calificacion1;
    this.calificacion2 = calificacion2;
    this.calificacion3 = calificacion3;
    this.tema = tema;
    this.comentario = comentario;
  }
}