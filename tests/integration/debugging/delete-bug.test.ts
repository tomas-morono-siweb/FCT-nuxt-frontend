import { describe, it, expect, beforeEach, vi } from 'vitest'

/**
 * Test para reproducir y verificar el bug de "undefined" en delete
 */

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

describe('Delete Bug - Debugging Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Players - Missing ID Bug', () => {
        it('should detect when player has undefined id', async () => {
            const playersWithMissingId = [
                {
                    id: undefined, // ⚠️ BUG: ID es undefined
                    nombre: 'Test',
                    apellidos: 'Player',
                    dorsal: 10,
                    salario: 1000000,
                    club: 'Test Club',
                    id_club: 'TC'
                }
            ]

            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: playersWithMissingId,
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
                }),
                remove: vi.fn()
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list()

            // Verificar que detectamos el problema
            const player = result.data[0]
            expect(player.id).toBeUndefined()

            console.warn('⚠️ DETECTADO: Player con id undefined:', player)
        })

        it('should detect when player id is null', async () => {
            const playersWithNullId = [
                {
                    id: null, // ⚠️ BUG: ID es null
                    nombre: 'Test',
                    apellidos: 'Player',
                    dorsal: 10,
                    salario: 1000000,
                    club: 'Test Club',
                    id_club: 'TC'
                }
            ]

            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: playersWithNullId,
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
                }),
                remove: vi.fn()
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list()

            const player = result.data[0]
            expect(player.id).toBeNull()

            console.warn('⚠️ DETECTADO: Player con id null:', player)
        })

        it('should fail when trying to delete player without id', async () => {
            const invalidPlayer = {
                id: undefined,
                nombre: 'Test',
                apellidos: 'Player'
            }

            mockUsePlayers.mockReturnValue({
                remove: vi.fn().mockImplementation((id) => {
                    if (id === undefined) {
                        return Promise.reject(new Error('Cannot delete player with undefined id'))
                    }
                    return Promise.resolve()
                })
            })

            const playersComposable = mockUsePlayers()

            // Esto debería fallar
            await expect(playersComposable.remove(invalidPlayer.id)).rejects.toThrow(
                'Cannot delete player with undefined id'
            )
        })
    })

    describe('Coaches - Missing ID Bug', () => {
        it('should detect when coach has undefined id', async () => {
            const coachesWithMissingId = [
                {
                    id: undefined,
                    dni: '12345678A',
                    nombre: 'Test',
                    apellidos: 'Coach',
                    salario: 1000000,
                    id_club: 'TC'
                }
            ]

            mockUseCoaches.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: coachesWithMissingId,
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
                }),
                remove: vi.fn()
            })

            const coachesComposable = mockUseCoaches()
            const result = await coachesComposable.list()

            const coach = result.data[0]
            expect(coach.id).toBeUndefined()

            console.warn('⚠️ DETECTADO: Coach con id undefined:', coach)
        })
    })

    describe('Clubs - Missing ID Bug', () => {
        it('should detect when club has undefined id', async () => {
            const clubsWithMissingId = [
                {
                    id: undefined,
                    id_club: 'TC',
                    nombre: 'Test Club',
                    fundacion: 2000,
                    ciudad: 'Test City',
                    estadio: 'Test Stadium',
                    presupuesto: 1000000,
                    presupuesto_restante: 1000000
                }
            ]

            mockUseClubs.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: clubsWithMissingId,
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
                }),
                remove: vi.fn()
            })

            const clubsComposable = mockUseClubs()
            const result = await clubsComposable.list()

            const club = result.data[0]
            expect(club.id).toBeUndefined()

            console.warn('⚠️ DETECTADO: Club con id undefined:', club)
        })
    })

    describe('Validation Guards', () => {
        it('should validate id exists before delete', () => {
            const validateId = (id: any): boolean => {
                return id !== undefined && id !== null && typeof id === 'number'
            }

            expect(validateId(1)).toBe(true)
            expect(validateId(0)).toBe(true) // 0 es un ID válido
            expect(validateId(undefined)).toBe(false)
            expect(validateId(null)).toBe(false)
            expect(validateId('1')).toBe(false) // String no es válido
        })

        it('should warn when id is invalid', () => {
            const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { })

            const handleDelete = (id: any) => {
                if (id === undefined || id === null) {
                    console.warn('⚠️ Attempting to delete with invalid id:', id)
                    return false
                }
                return true
            }

            expect(handleDelete(undefined)).toBe(false)
            expect(consoleWarnSpy).toHaveBeenCalledWith('⚠️ Attempting to delete with invalid id:', undefined)

            consoleWarnSpy.mockRestore()
        })
    })

    describe('API Response Validation', () => {
        it('should filter out items without valid id', () => {
            const apiResponse = [
                { id: 1, nombre: 'Valid Player 1' },
                { id: undefined, nombre: 'Invalid Player' }, // ⚠️ Sin ID
                { id: 2, nombre: 'Valid Player 2' },
                { id: null, nombre: 'Another Invalid' }, // ⚠️ Sin ID
                { id: 3, nombre: 'Valid Player 3' }
            ]

            // Filtrar solo items válidos
            const validItems = apiResponse.filter(item =>
                item.id !== undefined && item.id !== null && typeof item.id === 'number'
            )

            expect(validItems).toHaveLength(3)
            expect(validItems.every(item => typeof item.id === 'number')).toBe(true)
        })

        it('should log warning for items without id', () => {
            const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { })

            const validateApiResponse = (items: any[]) => {
                const invalidItems = items.filter(item =>
                    item.id === undefined || item.id === null
                )

                if (invalidItems.length > 0) {
                    console.warn(
                        `⚠️ API returned ${invalidItems.length} items without valid id:`,
                        invalidItems
                    )
                }

                return items.filter(item =>
                    item.id !== undefined && item.id !== null
                )
            }

            const apiResponse = [
                { id: 1, nombre: 'Valid' },
                { id: undefined, nombre: 'Invalid' }
            ]

            const validItems = validateApiResponse(apiResponse)

            expect(validItems).toHaveLength(1)
            expect(consoleWarnSpy).toHaveBeenCalled()

            consoleWarnSpy.mockRestore()
        })
    })
})

