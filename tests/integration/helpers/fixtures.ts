/**
 * Test Fixtures - Datos de prueba compartidos
 * Centraliza la creación de datos mock para evitar duplicación
 */

import type { Player } from '../../../app/interfaces/player'
import type { Coach } from '../../../app/interfaces/coach'
import type { Club } from '../../../app/interfaces/club'

/**
 * Factory para crear jugadores de prueba
 */
export const createMockPlayer = (overrides?: Partial<Player>): Player => ({
    id: 1,
    nombre: 'Lionel',
    apellidos: 'Messi',
    dorsal: 10,
    salario: 50000000,
    club: 'Paris Saint-Germain',
    entrenador: 'Mauricio Pochettino',
    id_club: 'PSG',
    ...overrides
})

/**
 * Factory para crear entrenadores de prueba
 */
export const createMockCoach = (overrides?: Partial<Coach>): Coach => ({
    id: 1,
    dni: '12345678A',
    nombre: 'Pep',
    apellidos: 'Guardiola',
    salario: 20000000,
    id_club: 'MCI',
    ...overrides
})

/**
 * Factory para crear clubs de prueba
 */
export const createMockClub = (overrides?: Partial<Club>): Club => ({
    id: 1,
    id_club: 'RM',
    nombre: 'Real Madrid',
    fundacion: 1902,
    ciudad: 'Madrid',
    estadio: 'Santiago Bernabéu',
    presupuesto: 500000000,
    presupuesto_restante: 300000000,
    entrenador: 'Carlo Ancelotti',
    jugadores: [],
    ...overrides
})

/**
 * Factory para crear paginación de prueba
 */
export const createMockPagination = (overrides?: Partial<any>) => ({
    currentPage: 1,
    pageSize: 20,
    totalItems: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    nextPage: null,
    prevPage: null,
    ...overrides
})

/**
 * Datos predefinidos comunes
 */
export const mockClubs = [
    createMockClub({
        id: 1,
        id_club: 'RM',
        nombre: 'Real Madrid',
        entrenador: 'Carlo Ancelotti'
    }),
    createMockClub({
        id: 2,
        id_club: 'FCB',
        nombre: 'FC Barcelona',
        fundacion: 1899,
        ciudad: 'Barcelona',
        estadio: 'Camp Nou',
        presupuesto: 400000000,
        presupuesto_restante: 250000000,
        entrenador: 'Xavi Hernández'
    })
]

export const mockPlayers = [
    createMockPlayer(),
    createMockPlayer({
        id: 2,
        nombre: 'Cristiano',
        apellidos: 'Ronaldo',
        dorsal: 7,
        salario: 45000000,
        club: 'Al Nassr',
        entrenador: 'Rudi Garcia',
        id_club: 'ALN'
    })
]

export const mockCoaches = [
    createMockCoach(),
    createMockCoach({
        id: 2,
        dni: '87654321B',
        nombre: 'Carlo',
        apellidos: 'Ancelotti',
        salario: 15000000,
        id_club: 'RM'
    })
]

