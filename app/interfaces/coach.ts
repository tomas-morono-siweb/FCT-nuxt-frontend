// import type { Club } from "./club";

export interface Coach {
  id: number;
  dni: string;
  nombre: string;
  apellidos: string;
  nacionalidad: string;
  salario: number;
  id_club?: string;
}
