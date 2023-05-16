export class RespuestaEncuesta {
    id: string;
    calificacion: number;
    tema: string;
    comentario: string;
    
    constructor(id: string, calificacion: number, tema: string, comentario: string) {
      this.id = id;
      this.calificacion = calificacion;
      this.tema = tema;
      this.comentario = comentario;
    }
}