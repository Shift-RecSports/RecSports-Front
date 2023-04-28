export class DeporteItem {
  idDeporte: string;
  nombre: string;
  areas: string[]; // Areas - CBD1, CBD2
  imagen: string;
}

export class EspacioItem {
  idEspacio: string;
  nombre: string;
  area: string;
}

export class newDeporte {
  nombre: string;
  espacios: string[]; // idEspacios
  imagen: string;
  descripcion: string;
}
