// import type { Coach } from './coach';
import type { Player } from './player'

export interface Club {
    id: number;
    nombre: string;
    fundacion: Date;
    ciudad: string;
    estadio: string;
    id_entrenador: number;
    presupuesto: number;
    $players: Player[];
}