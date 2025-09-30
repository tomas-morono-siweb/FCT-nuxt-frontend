export interface Club {
  id: number;
  id_club: string;
  nombre: string;
  fundacion: number;
  ciudad: string;
  estadio: string;
  presupuesto: number;
  presupuesto_restante: number;
  entrenador?: string;
  jugadores?: string[] | string;
}
