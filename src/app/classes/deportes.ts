// ESPACIO
export class EspacioItem {
  idEspacio: string;
  nombre: string;
  area: string;
}

// NUEVO DEPORTE
export class newDeporte {
  nombre: string;
  espacios: string[]; // idEspacios
  imagen: string;
  descripcion: string;
}

// DEPORTE
export class Deporte {
  id: string;
  nombre: string;
  descripcion: string;
  materiales: string;
  imagen: string;
  duracion: number;

  constructor(
    id: string,
    nombre: string,
    descripcion: string,
    materiales: string,
    imagen: string,
    duracion: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.materiales = materiales;
    this.imagen = imagen;
    this.duracion = duracion;
  }
}
