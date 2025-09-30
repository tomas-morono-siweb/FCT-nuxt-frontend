export interface Player {
  id: number;
  nombre: string;
  apellidos: string;
  dorsal: number;
  salario: number;
  club?: string;
  entrenador?: string;
  id_club?: string;
}
