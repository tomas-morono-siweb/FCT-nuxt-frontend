/**
 * Ejemplo de uso de Helpers - Guía de referencia
 * Este archivo demuestra cómo usar los helpers para escribir tests más limpios
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
    createMockPlayer,
    createMockCoach,
    createMockClub,
    createMockPagination,
    mockPlayers,
    mockCoaches,
    mockClubs,
    setupPlayersMock,
    setupCoachesMock,
    setupClubsMock,
    assertPlayerStructure,
    assertCoachStructure,
    assertClubStructure,
    assertDorsalRange,
    assertDNIFormat,
    assertFundacionYear
} from './index'

const mockUsePlayers = vi.fn()
const mockUseCoaches = vi.fn()
const mockUseClubs = vi.fn()

vi.mock('~/composables/usePlayers', () => ({
    usePlayers: mockUsePlayers
}))

vi.mock('~/composables/useCoaches', () => ({
    useCoaches: mockUseCoaches
}))

vi.mock('~/composables/useClubs', () => ({
    useClubs: mockUseClubs
}))

describe('Example: Using Helpers - Best Practices', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('1. Using Fixtures - Creating Mock Data', () => {
        it('Example: Create player with defaults', () => {
            const player = createMockPlayer()

            expect(player.nombre).toBe('Lionel')
            expect(player.apellidos).toBe('Messi')
            expect(player.id).toBe(1)
        })

        it('Example: Create player with overrides', () => {
            const player = createMockPlayer({
                nombre: 'Cristiano',
                apellidos: 'Ronaldo',
                dorsal: 7,
                id: 2
            })

            expect(player.nombre).toBe('Cristiano')
            expect(player.dorsal).toBe(7)
            expect(player.id).toBe(2)
        })

        it('Example: Use predefined mock arrays', () => {
            // mockPlayers ya tiene 2 jugadores predefinidos
            expect(mockPlayers).toHaveLength(2)
            expect(mockPlayers[0].nombre).toBe('Lionel')
            expect(mockPlayers[1].nombre).toBe('Cristiano')
        })
    })

    describe('2. Using Mock Setup Helpers', () => {
        it('Example: Setup players mock with list', async () => {
            // Antes: 10+ líneas de código
            // Después: 3 líneas
            setupPlayersMock(mockUsePlayers, {
                list: [createMockPlayer(), createMockPlayer({ id: 2 })]
            })

            const { list } = mockUsePlayers()
            const result = await list()

            expect(result.data).toHaveLength(2)
        })

        it('Example: Setup complete CRUD operations', async () => {
            const newPlayer = createMockPlayer({ id: 3 })
            
            setupPlayersMock(mockUsePlayers, {
                list: mockPlayers,
                get: mockPlayers[0],
                create: newPlayer,
                update: newPlayer
            })

            const composable = mockUsePlayers()

            // Todas las operaciones están listas
            const listResult = await composable.list()
            const getResult = await composable.get(1)
            const createResult = await composable.create({})
            const updateResult = await composable.update(1, {})

            expect(listResult.data).toHaveLength(2)
            expect(getResult.id).toBe(1)
            expect(createResult.id).toBe(3)
            expect(updateResult.id).toBe(3)
        })
    })

    describe('3. Using Assertions', () => {
        it('Example: Validate structure with one line', () => {
            const player = createMockPlayer()

            // Antes: 8 líneas de expect
            // Después: 1 línea
            assertPlayerStructure(player)
        })

        it('Example: Validate multiple aspects', () => {
            const player = createMockPlayer({ dorsal: 10 })
            const coach = createMockCoach({ dni: '12345678A' })
            const club = createMockClub({ fundacion: 1902 })

            // Validaciones concisas
            assertPlayerStructure(player)
            assertDorsalRange(player.dorsal)
            
            assertCoachStructure(coach)
            assertDNIFormat(coach.dni)
            
            assertClubStructure(club)
            assertFundacionYear(club.fundacion)
        })
    })

    describe('4. Combining Helpers for Complex Tests', () => {
        it('Example: Complete CRUD flow with helpers', async () => {
            // 1. Setup con helpers
            const newPlayer = createMockPlayer({ id: 3, nombre: 'New Player' })
            
            setupPlayersMock(mockUsePlayers, {
                list: [],
                create: newPlayer,
                get: newPlayer,
                update: { ...newPlayer, dorsal: 15 }
            })

            const composable = mockUsePlayers()

            // 2. Test create
            const created = await composable.create({})
            assertPlayerStructure(created)
            expect(created.id).toBe(3)

            // 3. Test get
            const fetched = await composable.get(3)
            assertPlayerStructure(fetched)
            assertDorsalRange(fetched.dorsal)

            // 4. Test update
            const updated = await composable.update(3, {})
            assertPlayerStructure(updated)
            expect(updated.dorsal).toBe(15)
        })
    })

    describe('5. Creating Custom Variations', () => {
        it('Example: Create multiple players with pattern', () => {
            const players = Array.from({ length: 5 }, (_, i) => 
                createMockPlayer({
                    id: i + 1,
                    nombre: `Player ${i + 1}`,
                    dorsal: i + 1
                })
            )

            expect(players).toHaveLength(5)
            players.forEach((player, i) => {
                assertPlayerStructure(player)
                expect(player.id).toBe(i + 1)
                assertDorsalRange(player.dorsal)
            })
        })

        it('Example: Create pagination mock', () => {
            const pagination = createMockPagination({
                currentPage: 2,
                totalPages: 5,
                hasNextPage: true,
                hasPreviousPage: true
            })

            expect(pagination.currentPage).toBe(2)
            expect(pagination.hasNextPage).toBe(true)
        })
    })

    describe('6. Error Scenarios with Helpers', () => {
        it('Example: Test with invalid data', () => {
            const invalidPlayer = createMockPlayer({
                id: undefined as any,
                dorsal: 150 // Fuera de rango
            })

            // Validar que detectamos el problema
            expect(invalidPlayer.id).toBeUndefined()
            expect(invalidPlayer.dorsal).toBeGreaterThan(99)
            
            // Esto fallaría con assertion
            // assertDorsalRange(invalidPlayer.dorsal) ← Lanzaría error
        })

        it('Example: Test API returning invalid data', async () => {
            setupPlayersMock(mockUsePlayers, {
                list: [
                    createMockPlayer({ id: undefined as any })
                ]
            })

            const { list } = mockUsePlayers()
            const result = await list()

            // Filter invalid items
            const validPlayers = result.data.filter((p: any) => p.id !== undefined)
            
            expect(result.data).toHaveLength(1)
            expect(validPlayers).toHaveLength(0)
        })
    })

    describe('7. Multi-Entity Tests with Helpers', () => {
        it('Example: Test relationships between entities', () => {
            const club = createMockClub({ id_club: 'RM' })
            const coach = createMockCoach({ id_club: 'RM' })
            const player = createMockPlayer({ id_club: 'RM' })

            // Verificar relaciones
            expect(club.id_club).toBe(coach.id_club)
            expect(club.id_club).toBe(player.id_club)

            // Validar todas las estructuras
            assertClubStructure(club)
            assertCoachStructure(coach)
            assertPlayerStructure(player)
        })
    })
})

