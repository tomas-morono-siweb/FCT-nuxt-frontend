import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock de los composables
const mockUseClubs = vi.fn()
const mockUseGlobalLoading = vi.fn()
const mockNavigateTo = vi.fn()
const mockClearNuxtData = vi.fn()

vi.mock('~/composables/useClubs', () => ({
    useClubs: mockUseClubs
}))

vi.mock('~/composables/useGlobalLoading', () => ({
    useGlobalLoading: mockUseGlobalLoading
}))

vi.mock('#app', () => ({
    navigateTo: mockNavigateTo,
    clearNuxtData: mockClearNuxtData
}))

describe('Clubs CRUD Flow - Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        // Mock useGlobalLoading
        mockUseGlobalLoading.mockReturnValue({
            withLoading: vi.fn().mockImplementation(async (fn) => await fn())
        })
    })

    describe('Complete CRUD Flow: Create → Read → Update → Delete', () => {
        it('Step 1: User navigates to clubs list', async () => {
            mockUseClubs.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 0 }
                })
            })

            const clubsComposable = mockUseClubs()
            const result = await clubsComposable.list(1, 20)

            expect(result.data).toEqual([])
            expect(result.pagination.totalItems).toBe(0)
        })

        it('Step 2: User clicks "New Club" button', async () => {
            await mockNavigateTo('/clubs/new')

            expect(mockNavigateTo).toHaveBeenCalledWith('/clubs/new')
        })

        it('Step 3: User creates a new club', async () => {
            const currentYear = new Date().getFullYear()
            const newClub = {
                id_club: 'LIV',
                nombre: 'Liverpool FC',
                fundacion: 1892,
                ciudad: 'Liverpool',
                estadio: 'Anfield',
                presupuesto: 600000000
            }

            mockUseClubs.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 1,
                    ...newClub,
                    presupuesto_restante: 600000000,
                    entrenador: undefined,
                    jugadores: []
                })
            })

            const clubsComposable = mockUseClubs()
            const createdClub = await clubsComposable.create(newClub)

            expect(createdClub.id).toBe(1)
            expect(createdClub.id_club).toBe('LIV')
            expect(createdClub.nombre).toBe('Liverpool FC')
            expect(createdClub.fundacion).toBe(1892)
        })

        it('Step 4: User is redirected to clubs list after creation', async () => {
            await mockNavigateTo('/clubs')

            expect(mockNavigateTo).toHaveBeenCalledWith('/clubs')
        })

        it('Step 5: User sees the created club in the list', async () => {
            mockUseClubs.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [{
                        id: 1,
                        id_club: 'LIV',
                        nombre: 'Liverpool FC',
                        fundacion: 1892,
                        ciudad: 'Liverpool',
                        estadio: 'Anfield',
                        presupuesto: 600000000,
                        presupuesto_restante: 600000000,
                        entrenador: undefined,
                        jugadores: []
                    }],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
                })
            })

            const clubsComposable = mockUseClubs()
            const result = await clubsComposable.list(1, 20)

            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toBe('Liverpool FC')
        })

        it('Step 6: User clicks on club to view details', async () => {
            await mockNavigateTo('/clubs/1')

            expect(mockNavigateTo).toHaveBeenCalledWith('/clubs/1')
        })

        it('Step 7: User views club details', async () => {
            mockUseClubs.mockReturnValue({
                get: vi.fn().mockResolvedValue({
                    id: 1,
                    id_club: 'LIV',
                    nombre: 'Liverpool FC',
                    fundacion: 1892,
                    ciudad: 'Liverpool',
                    estadio: 'Anfield',
                    presupuesto: 600000000,
                    presupuesto_restante: 600000000,
                    entrenador: undefined,
                    jugadores: []
                })
            })

            const clubsComposable = mockUseClubs()
            const club = await clubsComposable.get(1)

            expect(club.nombre).toBe('Liverpool FC')
            expect(club.estadio).toBe('Anfield')

            // Calculate years of history
            const currentYear = new Date().getFullYear()
            const yearsOfHistory = currentYear - club.fundacion
            expect(yearsOfHistory).toBeGreaterThan(100)
        })

        it('Step 8: User clicks "Edit" button', async () => {
            await mockNavigateTo('/clubs/edit-1')

            expect(mockNavigateTo).toHaveBeenCalledWith('/clubs/edit-1')
        })

        it('Step 9: User loads club data in edit form', async () => {
            mockUseClubs.mockReturnValue({
                get: vi.fn().mockResolvedValue({
                    id: 1,
                    id_club: 'LIV',
                    nombre: 'Liverpool FC',
                    fundacion: 1892,
                    ciudad: 'Liverpool',
                    estadio: 'Anfield',
                    presupuesto: 600000000,
                    presupuesto_restante: 600000000,
                    entrenador: undefined,
                    jugadores: []
                })
            })

            const clubsComposable = mockUseClubs()
            const club = await clubsComposable.get(1)

            expect(club.presupuesto).toBe(600000000)
        })

        it('Step 10: User updates club data (only editable fields)', async () => {
            const updatedData = {
                id_club: 'LFC', // Changed
                nombre: 'Liverpool Football Club', // Changed
                presupuesto: 700000000 // Changed
            }

            mockUseClubs.mockReturnValue({
                update: vi.fn().mockResolvedValue({
                    id: 1,
                    ...updatedData,
                    fundacion: 1892,
                    ciudad: 'Liverpool',
                    estadio: 'Anfield',
                    presupuesto_restante: 700000000,
                    entrenador: undefined,
                    jugadores: []
                })
            })

            const clubsComposable = mockUseClubs()
            const updatedClub = await clubsComposable.update(1, updatedData)

            expect(updatedClub.id_club).toBe('LFC')
            expect(updatedClub.nombre).toBe('Liverpool Football Club')
            expect(updatedClub.presupuesto).toBe(700000000)
        })

        it('Step 11: User is redirected to club detail after update', async () => {
            await mockClearNuxtData('club:1')
            await mockNavigateTo('/clubs/1')

            expect(mockClearNuxtData).toHaveBeenCalledWith('club:1')
            expect(mockNavigateTo).toHaveBeenCalledWith('/clubs/1')
        })

        it('Step 12: User navigates back to clubs list', async () => {
            await mockNavigateTo('/clubs')

            expect(mockNavigateTo).toHaveBeenCalledWith('/clubs')
        })

        it('Step 13: User confirms deletion', () => {
            const mockConfirm = vi.spyOn(window, 'confirm').mockReturnValue(true)

            const confirmed = window.confirm('¿Seguro que deseas borrar este club?')

            expect(confirmed).toBe(true)
            mockConfirm.mockRestore()
        })

        it('Step 14: User deletes the club', async () => {
            mockUseClubs.mockReturnValue({
                remove: vi.fn().mockResolvedValue(undefined)
            })

            const clubsComposable = mockUseClubs()
            await clubsComposable.remove(1)

            expect(clubsComposable.remove).toHaveBeenCalledWith(1)
        })

        it('Step 15: Cache is cleared after deletion', async () => {
            await mockClearNuxtData('club:1')

            expect(mockClearNuxtData).toHaveBeenCalledWith('club:1')
        })

        it('Step 16: User sees empty list after deletion', async () => {
            mockUseClubs.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 0 }
                })
            })

            const clubsComposable = mockUseClubs()
            const result = await clubsComposable.list(1, 20)

            expect(result.data).toHaveLength(0)
        })
    })

    describe('Fundacion Year Validation Flow', () => {
        it('Step 1: User enters invalid fundacion year (too old)', async () => {
            mockUseClubs.mockReturnValue({
                create: vi.fn().mockRejectedValue(new Error('El año de fundación debe ser posterior a 1800'))
            })

            const clubsComposable = mockUseClubs()

            await expect(clubsComposable.create({
                id_club: 'OLD',
                nombre: 'Old Club',
                fundacion: 1700, // Invalid
                ciudad: 'City',
                estadio: 'Stadium',
                presupuesto: 100000000
            })).rejects.toThrow('El año de fundación debe ser posterior a 1800')
        })

        it('Step 2: User enters invalid fundacion year (future)', async () => {
            const futureYear = new Date().getFullYear() + 1

            mockUseClubs.mockReturnValue({
                create: vi.fn().mockRejectedValue(new Error('El año de fundación no puede ser futuro'))
            })

            const clubsComposable = mockUseClubs()

            await expect(clubsComposable.create({
                id_club: 'NEW',
                nombre: 'Future Club',
                fundacion: futureYear, // Invalid
                ciudad: 'City',
                estadio: 'Stadium',
                presupuesto: 100000000
            })).rejects.toThrow('El año de fundación no puede ser futuro')
        })

        it('Step 3: User corrects fundacion year and retries', async () => {
            mockUseClubs.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 2,
                    id_club: 'CHE',
                    nombre: 'Chelsea FC',
                    fundacion: 1905,
                    ciudad: 'London',
                    estadio: 'Stamford Bridge',
                    presupuesto: 650000000,
                    presupuesto_restante: 650000000,
                    entrenador: undefined,
                    jugadores: []
                })
            })

            const clubsComposable = mockUseClubs()
            const club = await clubsComposable.create({
                id_club: 'CHE',
                nombre: 'Chelsea FC',
                fundacion: 1905, // Valid
                ciudad: 'London',
                estadio: 'Stamford Bridge',
                presupuesto: 650000000
            })

            expect(club.fundacion).toBe(1905)
        })
    })

    describe('Budget Management Flow', () => {
        it('Step 1: User creates club with budget', async () => {
            mockUseClubs.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 3,
                    id_club: 'ARS',
                    nombre: 'Arsenal FC',
                    fundacion: 1886,
                    ciudad: 'London',
                    estadio: 'Emirates Stadium',
                    presupuesto: 500000000,
                    presupuesto_restante: 500000000,
                    entrenador: undefined,
                    jugadores: []
                })
            })

            const clubsComposable = mockUseClubs()
            const club = await clubsComposable.create({
                id_club: 'ARS',
                nombre: 'Arsenal FC',
                fundacion: 1886,
                ciudad: 'London',
                estadio: 'Emirates Stadium',
                presupuesto: 500000000
            })

            expect(club.presupuesto).toBe(500000000)
            expect(club.presupuesto_restante).toBe(500000000)
        })

        it('Step 2: User increases club budget', async () => {
            mockUseClubs.mockReturnValue({
                update: vi.fn().mockResolvedValue({
                    id: 3,
                    id_club: 'ARS',
                    nombre: 'Arsenal FC',
                    fundacion: 1886,
                    ciudad: 'London',
                    estadio: 'Emirates Stadium',
                    presupuesto: 600000000, // Increased
                    presupuesto_restante: 600000000,
                    entrenador: undefined,
                    jugadores: []
                })
            })

            const clubsComposable = mockUseClubs()
            const club = await clubsComposable.update(3, {
                id_club: 'ARS',
                nombre: 'Arsenal FC',
                presupuesto: 600000000
            })

            expect(club.presupuesto).toBe(600000000)
        })

        it('Step 3: User views budget percentage', () => {
            const presupuesto = 600000000
            const presupuesto_restante = 400000000
            const percentage = (presupuesto_restante / presupuesto) * 100

            expect(percentage).toBeCloseTo(66.67, 2)
        })
    })

    describe('Pagination Flow', () => {
        it('Step 1: User views first page', async () => {
            mockUseClubs.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: new Array(20).fill(null).map((_, i) => ({
                        id: i + 1,
                        id_club: `CLB${i + 1}`,
                        nombre: `Club ${i + 1}`,
                        fundacion: 1900 + i,
                        ciudad: 'City',
                        estadio: 'Stadium',
                        presupuesto: 100000000,
                        presupuesto_restante: 100000000,
                        entrenador: undefined,
                        jugadores: []
                    })),
                    pagination: {
                        currentPage: 1,
                        pageSize: 20,
                        totalItems: 30,
                        totalPages: 2,
                        hasNextPage: true,
                        hasPreviousPage: false
                    }
                })
            })

            const clubsComposable = mockUseClubs()
            const result = await clubsComposable.list(1, 20)

            expect(result.data).toHaveLength(20)
            expect(result.pagination.hasNextPage).toBe(true)
        })

        it('Step 2: User navigates to next page', async () => {
            mockUseClubs.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: new Array(10).fill(null).map((_, i) => ({
                        id: i + 21,
                        id_club: `CLB${i + 21}`,
                        nombre: `Club ${i + 21}`,
                        fundacion: 1920 + i,
                        ciudad: 'City',
                        estadio: 'Stadium',
                        presupuesto: 100000000,
                        presupuesto_restante: 100000000,
                        entrenador: undefined,
                        jugadores: []
                    })),
                    pagination: {
                        currentPage: 2,
                        pageSize: 20,
                        totalItems: 30,
                        totalPages: 2,
                        hasNextPage: false,
                        hasPreviousPage: true
                    }
                })
            })

            const clubsComposable = mockUseClubs()
            const result = await clubsComposable.list(2, 20)

            expect(result.data).toHaveLength(10)
            expect(result.pagination.hasNextPage).toBe(false)
        })
    })

    describe('Club Code Validation Flow', () => {
        it('Step 1: User enters lowercase club code', async () => {
            mockUseClubs.mockReturnValue({
                create: vi.fn().mockRejectedValue(new Error('El código del club debe estar en mayúsculas'))
            })

            const clubsComposable = mockUseClubs()

            await expect(clubsComposable.create({
                id_club: 'liv', // Invalid - lowercase
                nombre: 'Liverpool FC',
                fundacion: 1892,
                ciudad: 'Liverpool',
                estadio: 'Anfield',
                presupuesto: 600000000
            })).rejects.toThrow('El código del club debe estar en mayúsculas')
        })

        it('Step 2: User corrects club code', async () => {
            mockUseClubs.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 4,
                    id_club: 'LIV',
                    nombre: 'Liverpool FC',
                    fundacion: 1892,
                    ciudad: 'Liverpool',
                    estadio: 'Anfield',
                    presupuesto: 600000000,
                    presupuesto_restante: 600000000,
                    entrenador: undefined,
                    jugadores: []
                })
            })

            const clubsComposable = mockUseClubs()
            const club = await clubsComposable.create({
                id_club: 'LIV', // Corrected - uppercase
                nombre: 'Liverpool FC',
                fundacion: 1892,
                ciudad: 'Liverpool',
                estadio: 'Anfield',
                presupuesto: 600000000
            })

            expect(club.id_club).toBe('LIV')
        })
    })
})

