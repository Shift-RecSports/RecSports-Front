export class Aforo {
    actual: number;
    aforo: number;

  
    constructor(actual: number, aforo: number) {
      this.actual = actual;
      this.aforo = aforo;
    }
}

export class ConcurrenciaGimnasio {
    hora_inicio: string;
    hora_fin: string;
    historico: number;
    actual: number;
  
    constructor(hora_inicio:string, hora_fin:string, historico:number, actual: number) {
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.historico = historico;
        this.actual = actual;
    }
}

