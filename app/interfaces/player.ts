// import type { Club } from './club'

export interface Player {
  id: number;
  nombre: string;
  apellido: string;
  posicion: string;
  dorsal?: number;
  clubId?: number;
}
