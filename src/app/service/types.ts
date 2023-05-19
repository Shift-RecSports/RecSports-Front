export interface userLogin {
  matricula: string;
  password: string;
}

export interface User {
  matricula: string | undefined;
  nombre: string | undefined;
  userRole: string | undefined;
}

export interface navbarFlags {
  inicioFlag: boolean;
  gimnasioFlag: boolean;
  deportesFlag: boolean;
  calendarioFlag: boolean;
  noticasFlag: boolean;
  mapaFlag: boolean;
  encuestaFlag: boolean;
  entradaFlag: boolean;
  salidaFlag: boolean;
  encuestaAdminFlag: boolean;
}
