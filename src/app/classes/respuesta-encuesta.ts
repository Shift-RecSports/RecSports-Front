export class RespuestaEncuesta {
    id: string;
    fecha: string;
    calificacion: number;
    tema: string;
    comentario: string;
    
    constructor(id: string, fecha: string, calificacion: number, tema: string, comentario: string) {
      this.id = id;
      this.fecha = fecha;
      this.calificacion = calificacion;
      this.tema = tema;
      this.comentario = comentario;
    }
}