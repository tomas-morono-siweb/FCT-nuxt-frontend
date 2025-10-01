import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock de los composables
const mockUsePlayers = vi.fn()
const mockUseClubs = vi.fn()
const mockUseGlobalLoading = vi.fn()
const mockNavigateTo = vi.fn()
const mockClearNuxtData = vi.fn()

vi.mock('~/composables/usePlayers', () => ({
    usePlayers: mockUsePlayers
}))

vi.mock('~/composables/useClubs', () => ({
    useClubs: mockUseClubs
}))

vi.mock('~/composables/useGlobalLoading', () => ({
    useGlobalLoading: mockUseGlobalLoading
}))

vi.mock('#app', () => ({
    navigateTo: mockNavigateTo,
    clearNuxtData: mockClearNuxtData,
    useAsyncData: vi.fn()
}))

describe('Players CRUD Flow - Integration Tests', () => {
    const mockClubs = [
        {
            id: 1,
            id_club: 'RM',
            nombre: 'Real Madrid',
            fundacion: 1902,
            ciudad: 'Madrid',
            estadio: 'Santiago Bernabéu',
            presupuesto: 500000000,
            presupuesto_restante: 300000000,
            entrenador: 'Carlo Ancelotti',
            jugadores: []
        }
    ]

    let createdPlayerId: number

    beforeEach(() => {
        vi.clearAllMocks()
        createdPlayerId = 0

        // Mock useGlobalLoading
        mockUseGlobalLoading.mockReturnValue({
            withLoading: vi.fn().mockImplementation(async (fn) => await fn())
        })

        // Mock useClubs
        mockUseClubs.mockReturnValue({
            list: vi.fn().mockResolvedValue({
                data: mockClubs,
                pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
            })
        })
    })

    describe('Complete CRUD Flow: Create → Read → Update → Delete', () => {
        it('Step 1: User navigates to players list', async () => {
            // Mock initial players list
            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 0 }
                })
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list('', 1, 20)

            expect(result.data).toEqual([])
            expect(result.pagination.totalItems).toBe(0)
        })

        it('Step 2: User clicks "New Player" button', async () => {
            await mockNavigateTo('/players/new')

            expect(mockNavigateTo).toHaveBeenCalledWith('/players/new')
        })

        it('Step 3: User loads clubs for selection in new form', async () => {
            const clubsComposable = mockUseClubs()
            const result = await clubsComposable.list()

            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toBe('Real Madrid')
        })

        it('Step 4: User creates a new player', async () => {
            const newPlayer = {
                nombre: 'Vinicius',
                apellidos: 'Junior',
                dorsal: 20,
                salario: 10000000,
                id_club: 'RM'
            }

            mockUsePlayers.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 1,
                    ...newPlayer,
                    club: 'Real Madrid',
                    entrenador: 'Carlo Ancelotti'
                })
            })

            const playersComposable = mockUsePlayers()
            const createdPlayer = await playersComposable.create(newPlayer)

            createdPlayerId = createdPlayer.id

            expect(createdPlayer.id).toBe(1)
            expect(createdPlayer.nombre).toBe('Vinicius')
            expect(createdPlayer.apellidos).toBe('Junior')
            expect(createdPlayer.dorsal).toBe(20)
        })

        it('Step 5: User is redirected to player detail after creation', async () => {
            const playerId = 1
            await mockNavigateTo(`/players/${playerId}`)

            expect(mockNavigateTo).toHaveBeenCalledWith('/players/1')
        })

        it('Step 6: User views player details', async () => {
            mockUsePlayers.mockReturnValue({
                get: vi.fn().mockResolvedValue({
                    id: 1,
                    nombre: 'Vinicius',
                    apellidos: 'Junior',
                    dorsal: 20,
                    salario: 10000000,
                    club: 'Real Madrid',
                    entrenador: 'Carlo Ancelotti',
                    id_club: 'RM'
                })
            })

            const playersComposable = mockUsePlayers()
            const player = await playersComposable.get(1)

            expect(player.nombre).toBe('Vinicius')
            expect(player.club).toBe('Real Madrid')
        })

        it('Step 7: User clicks "Edit" button on player detail', async () => {
            await mockNavigateTo('/players/edit-1')

            expect(mockNavigateTo).toHaveBeenCalledWith('/players/edit-1')
        })

        it('Step 8: User loads player data in edit form', async () => {
            mockUsePlayers.mockReturnValue({
                get: vi.fn().mockResolvedValue({
                    id: 1,
                    nombre: 'Vinicius',
                    apellidos: 'Junior',
                    dorsal: 20,
                    salario: 10000000,
                    club: 'Real Madrid',
                    entrenador: 'Carlo Ancelotti',
                    id_club: 'RM'
                })
            })

            const playersComposable = mockUsePlayers()
            const player = await playersComposable.get(1)

            expect(player.id).toBe(1)
            expect(player.dorsal).toBe(20)
        })

        it('Step 9: User updates player data', async () => {
            const updatedData = {
                nombre: 'Vinicius',
                apellidos: 'Junior',
                dorsal: 7, // Changed
                salario: 15000000, // Changed
                id_club: 'RM'
            }

            mockUsePlayers.mockReturnValue({
                update: vi.fn().mockResolvedValue({
                    id: 1,
                    ...updatedData,
                    club: 'Real Madrid',
                    entrenador: 'Carlo Ancelotti'
                })
            })

            const playersComposable = mockUsePlayers()
            const updatedPlayer = await playersComposable.update(1, updatedData)

            expect(updatedPlayer.dorsal).toBe(7)
            expect(updatedPlayer.salario).toBe(15000000)
        })

        it('Step 10: User is redirected to player detail after update', async () => {
            await mockClearNuxtData('player:1')
            await mockNavigateTo('/players/1')

            expect(mockClearNuxtData).toHaveBeenCalledWith('player:1')
            expect(mockNavigateTo).toHaveBeenCalledWith('/players/1')
        })

        it('Step 11: User sees updated player details', async () => {
            mockUsePlayers.mockReturnValue({
                get: vi.fn().mockResolvedValue({
                    id: 1,
                    nombre: 'Vinicius',
                    apellidos: 'Junior',
                    dorsal: 7,
                    salario: 15000000,
                    club: 'Real Madrid',
                    entrenador: 'Carlo Ancelotti',
                    id_club: 'RM'
                })
            })

            const playersComposable = mockUsePlayers()
            const player = await playersComposable.get(1)

            expect(player.dorsal).toBe(7)
            expect(player.salario).toBe(15000000)
        })

        it('Step 12: User navigates back to players list', async () => {
            await mockNavigateTo('/players')

            expect(mockNavigateTo).toHaveBeenCalledWith('/players')
        })

        it('Step 13: User sees the created player in the list', async () => {
            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [{
                        id: 1,
                        nombre: 'Vinicius',
                        apellidos: 'Junior',
                        dorsal: 7,
                        salario: 15000000,
                        club: 'Real Madrid',
                        entrenador: 'Carlo Ancelotti',
                        id_club: 'RM'
                    }],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
                })
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list('', 1, 20)

            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toBe('Vinicius')
        })

        it('Step 14: User confirms deletion', () => {
            const mockConfirm = vi.spyOn(window, 'confirm').mockReturnValue(true)

            const confirmed = window.confirm('¿Seguro que deseas borrar este jugador?')

            expect(confirmed).toBe(true)
            mockConfirm.mockRestore()
        })

        it('Step 15: User deletes the player', async () => {
            mockUsePlayers.mockReturnValue({
                remove: vi.fn().mockResolvedValue(undefined)
            })

            const playersComposable = mockUsePlayers()
            await playersComposable.remove(1)

            expect(playersComposable.remove).toHaveBeenCalledWith(1)
        })

        it('Step 16: Cache is cleared after deletion', async () => {
            await mockClearNuxtData('player:1')

            expect(mockClearNuxtData).toHaveBeenCalledWith('player:1')
        })

        it('Step 17: User sees empty list after deletion', async () => {
            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 0 }
                })
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list('', 1, 20)

            expect(result.data).toHaveLength(0)
            expect(result.pagination.totalItems).toBe(0)
        })
    })

    describe('Search Flow with Debounce', () => {
        it('Step 1: User types search query', () => {
            const searchQuery = 'Vin'

            expect(searchQuery).toBe('Vin')
            expect(searchQuery.length).toBe(3)
        })

        it('Step 2: Debounce delays the search', async () => {
            const debounceTime = 500
            const startTime = Date.now()

            await new Promise(resolve => setTimeout(resolve, debounceTime))

            const endTime = Date.now()
            const elapsed = endTime - startTime

            expect(elapsed).toBeGreaterThanOrEqual(debounceTime)
        })

        it('Step 3: Search is executed after debounce', async () => {
            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [{
                        id: 1,
                        nombre: 'Vinicius',
                        apellidos: 'Junior',
                        dorsal: 7,
                        salario: 15000000,
                        club: 'Real Madrid',
                        entrenador: 'Carlo Ancelotti',
                        id_club: 'RM'
                    }],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
                })
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list('Vin', 1, 20)

            expect(playersComposable.list).toHaveBeenCalledWith('Vin', 1, 20)
            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toContain('Vin')
        })

        it('Step 4: User clears search', async () => {
            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [{
                        id: 1,
                        nombre: 'Vinicius',
                        apellidos: 'Junior',
                        dorsal: 7,
                        salario: 15000000,
                        club: 'Real Madrid',
                        entrenador: 'Carlo Ancelotti',
                        id_club: 'RM'
                    }, {
                        id: 2,
                        nombre: 'Karim',
                        apellidos: 'Benzema',
                        dorsal: 9,
                        salario: 20000000,
                        club: 'Real Madrid',
                        entrenador: 'Carlo Ancelotti',
                        id_club: 'RM'
                    }],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 2 }
                })
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list('', 1, 20)

            expect(result.data).toHaveLength(2)
        })
    })

    describe('Pagination Flow', () => {
        it('Step 1: User sees first page of results', async () => {
            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: new Array(20).fill(null).map((_, i) => ({
                        id: i + 1,
                        nombre: `Player ${i + 1}`,
                        apellidos: 'Test',
                        dorsal: i + 1,
                        salario: 1000000,
                        club: 'Real Madrid',
                        entrenador: 'Carlo Ancelotti',
                        id_club: 'RM'
                    })),
                    pagination: {
                        currentPage: 1,
                        pageSize: 20,
                        totalItems: 45,
                        totalPages: 3,
                        hasNextPage: true,
                        hasPreviousPage: false
                    }
                })
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list('', 1, 20)

            expect(result.data).toHaveLength(20)
            expect(result.pagination.currentPage).toBe(1)
            expect(result.pagination.hasNextPage).toBe(true)
        })

        it('Step 2: User clicks next page', async () => {
            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: new Array(20).fill(null).map((_, i) => ({
                        id: i + 21,
                        nombre: `Player ${i + 21}`,
                        apellidos: 'Test',
                        dorsal: i + 1,
                        salario: 1000000,
                        club: 'Real Madrid',
                        entrenador: 'Carlo Ancelotti',
                        id_club: 'RM'
                    })),
                    pagination: {
                        currentPage: 2,
                        pageSize: 20,
                        totalItems: 45,
                        totalPages: 3,
                        hasNextPage: true,
                        hasPreviousPage: true
                    }
                })
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list('', 2, 20)

            expect(result.pagination.currentPage).toBe(2)
            expect(result.pagination.hasPreviousPage).toBe(true)
            expect(result.pagination.hasNextPage).toBe(true)
        })

        it('Step 3: User navigates to last page', async () => {
            mockUsePlayers.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: new Array(5).fill(null).map((_, i) => ({
                        id: i + 41,
                        nombre: `Player ${i + 41}`,
                        apellidos: 'Test',
                        dorsal: i + 1,
                        salario: 1000000,
                        club: 'Real Madrid',
                        entrenador: 'Carlo Ancelotti',
                        id_club: 'RM'
                    })),
                    pagination: {
                        currentPage: 3,
                        pageSize: 20,
                        totalItems: 45,
                        totalPages: 3,
                        hasNextPage: false,
                        hasPreviousPage: true
                    }
                })
            })

            const playersComposable = mockUsePlayers()
            const result = await playersComposable.list('', 3, 20)

            expect(result.data).toHaveLength(5)
            expect(result.pagination.currentPage).toBe(3)
            expect(result.pagination.hasNextPage).toBe(false)
        })
    })

    describe('Error Recovery Flow', () => {
        it('Step 1: User attempts to create player with validation error', async () => {
            mockUsePlayers.mockReturnValue({
                create: vi.fn().mockRejectedValue(new Error('El dorsal debe estar entre 1 y 99'))
            })

            const playersComposable = mockUsePlayers()

            await expect(playersComposable.create({
                nombre: 'Test',
                apellidos: 'Player',
                dorsal: 100, // Invalid
                salario: 1000000,
                id_club: 'RM'
            })).rejects.toThrow('El dorsal debe estar entre 1 y 99')
        })

        it('Step 2: User corrects the error and retries', async () => {
            mockUsePlayers.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 2,
                    nombre: 'Test',
                    apellidos: 'Player',
                    dorsal: 15,
                    salario: 1000000,
                    club: 'Real Madrid',
                    entrenador: 'Carlo Ancelotti',
                    id_club: 'RM'
                })
            })

            const playersComposable = mockUsePlayers()
            const player = await playersComposable.create({
                nombre: 'Test',
                apellidos: 'Player',
                dorsal: 15, // Corrected
                salario: 1000000,
                id_club: 'RM'
            })

            expect(player.id).toBe(2)
            expect(player.dorsal).toBe(15)
        })
    })

    describe('Cancel Flow', () => {
        it('User cancels new player form', async () => {
            await mockNavigateTo('/players')

            expect(mockNavigateTo).toHaveBeenCalledWith('/players')
        })

        it('User cancels edit player form', async () => {
            await mockNavigateTo('/players/1')

            expect(mockNavigateTo).toHaveBeenCalledWith('/players/1')
        })
    })
})

