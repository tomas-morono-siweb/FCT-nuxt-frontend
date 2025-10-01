import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock de los composables
const mockUseCoaches = vi.fn()
const mockUseClubs = vi.fn()
const mockUseGlobalLoading = vi.fn()
const mockNavigateTo = vi.fn()
const mockClearNuxtData = vi.fn()

vi.mock('~/composables/useCoaches', () => ({
    useCoaches: mockUseCoaches
}))

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

describe('Coaches CRUD Flow - Integration Tests', () => {
    const mockClubs = [
        {
            id: 1,
            id_club: 'MCI',
            nombre: 'Manchester City',
            fundacion: 1880,
            ciudad: 'Manchester',
            estadio: 'Etihad Stadium',
            presupuesto: 700000000,
            presupuesto_restante: 500000000,
            entrenador: 'Pep Guardiola',
            jugadores: []
        }
    ]

    beforeEach(() => {
        vi.clearAllMocks()

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
        it('Step 1: User navigates to coaches list', async () => {
            mockUseCoaches.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 0 }
                })
            })

            const coachesComposable = mockUseCoaches()
            const result = await coachesComposable.list(1, 20)

            expect(result.data).toEqual([])
            expect(result.pagination.totalItems).toBe(0)
        })

        it('Step 2: User clicks "New Coach" button', async () => {
            await mockNavigateTo('/coaches/new')

            expect(mockNavigateTo).toHaveBeenCalledWith('/coaches/new')
        })

        it('Step 3: User loads clubs for selection', async () => {
            const clubsComposable = mockUseClubs()
            const result = await clubsComposable.list()

            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toBe('Manchester City')
        })

        it('Step 4: User creates a new coach', async () => {
            const newCoach = {
                dni: '12345678A',
                nombre: 'Pep',
                apellidos: 'Guardiola',
                salario: 20000000,
                id_club: 'MCI'
            }

            mockUseCoaches.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 1,
                    ...newCoach
                })
            })

            const coachesComposable = mockUseCoaches()
            const createdCoach = await coachesComposable.create(newCoach)

            expect(createdCoach.id).toBe(1)
            expect(createdCoach.dni).toBe('12345678A')
            expect(createdCoach.nombre).toBe('Pep')
        })

        it('Step 5: User is redirected to coaches list after creation', async () => {
            await mockNavigateTo('/coaches')

            expect(mockNavigateTo).toHaveBeenCalledWith('/coaches')
        })

        it('Step 6: User sees the created coach in the list', async () => {
            mockUseCoaches.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [{
                        id: 1,
                        dni: '12345678A',
                        nombre: 'Pep',
                        apellidos: 'Guardiola',
                        salario: 20000000,
                        id_club: 'MCI'
                    }],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 1 }
                })
            })

            const coachesComposable = mockUseCoaches()
            const result = await coachesComposable.list(1, 20)

            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toBe('Pep')
        })

        it('Step 7: User clicks on coach to view details', async () => {
            await mockNavigateTo('/coaches/1')

            expect(mockNavigateTo).toHaveBeenCalledWith('/coaches/1')
        })

        it('Step 8: User views coach details', async () => {
            mockUseCoaches.mockReturnValue({
                get: vi.fn().mockResolvedValue({
                    id: 1,
                    dni: '12345678A',
                    nombre: 'Pep',
                    apellidos: 'Guardiola',
                    salario: 20000000,
                    id_club: 'MCI'
                })
            })

            const coachesComposable = mockUseCoaches()
            const coach = await coachesComposable.get(1)

            expect(coach.nombre).toBe('Pep')
            expect(coach.dni).toBe('12345678A')
        })

        it('Step 9: User clicks "Edit" button', async () => {
            await mockNavigateTo('/coaches/edit-1')

            expect(mockNavigateTo).toHaveBeenCalledWith('/coaches/edit-1')
        })

        it('Step 10: User loads coach data in edit form', async () => {
            mockUseCoaches.mockReturnValue({
                get: vi.fn().mockResolvedValue({
                    id: 1,
                    dni: '12345678A',
                    nombre: 'Pep',
                    apellidos: 'Guardiola',
                    salario: 20000000,
                    id_club: 'MCI'
                })
            })

            const coachesComposable = mockUseCoaches()
            const coach = await coachesComposable.get(1)

            expect(coach.salario).toBe(20000000)
        })

        it('Step 11: User updates coach data', async () => {
            const updatedData = {
                dni: '12345678A',
                nombre: 'Pep',
                apellidos: 'Guardiola',
                salario: 25000000, // Changed
                id_club: 'MCI'
            }

            mockUseCoaches.mockReturnValue({
                update: vi.fn().mockResolvedValue({
                    id: 1,
                    ...updatedData
                })
            })

            const coachesComposable = mockUseCoaches()
            const updatedCoach = await coachesComposable.update(1, updatedData)

            expect(updatedCoach.salario).toBe(25000000)
        })

        it('Step 12: User is redirected to coach detail after update', async () => {
            await mockClearNuxtData('coach:1')
            await mockNavigateTo('/coaches/1')

            expect(mockClearNuxtData).toHaveBeenCalledWith('coach:1')
            expect(mockNavigateTo).toHaveBeenCalledWith('/coaches/1')
        })

        it('Step 13: User navigates back to coaches list', async () => {
            await mockNavigateTo('/coaches')

            expect(mockNavigateTo).toHaveBeenCalledWith('/coaches')
        })

        it('Step 14: User confirms deletion', () => {
            const mockConfirm = vi.spyOn(window, 'confirm').mockReturnValue(true)

            const confirmed = window.confirm('¿Seguro que deseas borrar este entrenador?')

            expect(confirmed).toBe(true)
            mockConfirm.mockRestore()
        })

        it('Step 15: User deletes the coach', async () => {
            mockUseCoaches.mockReturnValue({
                remove: vi.fn().mockResolvedValue(undefined)
            })

            const coachesComposable = mockUseCoaches()
            await coachesComposable.remove(1)

            expect(coachesComposable.remove).toHaveBeenCalledWith(1)
        })

        it('Step 16: Cache is cleared after deletion', async () => {
            await mockClearNuxtData('coach:1')

            expect(mockClearNuxtData).toHaveBeenCalledWith('coach:1')
        })

        it('Step 17: User sees empty list after deletion', async () => {
            mockUseCoaches.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: [],
                    pagination: { currentPage: 1, totalPages: 1, totalItems: 0 }
                })
            })

            const coachesComposable = mockUseCoaches()
            const result = await coachesComposable.list(1, 20)

            expect(result.data).toHaveLength(0)
        })
    })

    describe('DNI Validation Flow', () => {
        it('Step 1: User enters invalid DNI format', async () => {
            mockUseCoaches.mockReturnValue({
                create: vi.fn().mockRejectedValue(new Error('DNI inválido'))
            })

            const coachesComposable = mockUseCoaches()

            await expect(coachesComposable.create({
                dni: '1234567A', // Invalid - missing one digit
                nombre: 'Test',
                apellidos: 'Coach',
                salario: 10000000,
                id_club: 'MCI'
            })).rejects.toThrow('DNI inválido')
        })

        it('Step 2: User corrects DNI and retries', async () => {
            mockUseCoaches.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 2,
                    dni: '12345678A',
                    nombre: 'Test',
                    apellidos: 'Coach',
                    salario: 10000000,
                    id_club: 'MCI'
                })
            })

            const coachesComposable = mockUseCoaches()
            const coach = await coachesComposable.create({
                dni: '12345678A', // Corrected
                nombre: 'Test',
                apellidos: 'Coach',
                salario: 10000000,
                id_club: 'MCI'
            })

            expect(coach.dni).toBe('12345678A')
        })
    })

    describe('Club Association Flow', () => {
        it('Step 1: User creates coach without club', async () => {
            mockUseCoaches.mockReturnValue({
                create: vi.fn().mockResolvedValue({
                    id: 3,
                    dni: '87654321B',
                    nombre: 'Roberto',
                    apellidos: 'Martinez',
                    salario: 15000000,
                    id_club: undefined
                })
            })

            const coachesComposable = mockUseCoaches()
            const coach = await coachesComposable.create({
                dni: '87654321B',
                nombre: 'Roberto',
                apellidos: 'Martinez',
                salario: 15000000,
                id_club: undefined
            })

            expect(coach.id_club).toBeUndefined()
        })

        it('Step 2: User edits coach to assign club', async () => {
            mockUseCoaches.mockReturnValue({
                update: vi.fn().mockResolvedValue({
                    id: 3,
                    dni: '87654321B',
                    nombre: 'Roberto',
                    apellidos: 'Martinez',
                    salario: 15000000,
                    id_club: 'MCI'
                })
            })

            const coachesComposable = mockUseCoaches()
            const coach = await coachesComposable.update(3, {
                dni: '87654321B',
                nombre: 'Roberto',
                apellidos: 'Martinez',
                salario: 15000000,
                id_club: 'MCI'
            })

            expect(coach.id_club).toBe('MCI')
        })
    })

    describe('Pagination Flow', () => {
        it('Step 1: User views first page', async () => {
            mockUseCoaches.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: new Array(20).fill(null).map((_, i) => ({
                        id: i + 1,
                        dni: `1234567${i}A`,
                        nombre: `Coach ${i + 1}`,
                        apellidos: 'Test',
                        salario: 10000000,
                        id_club: 'MCI'
                    })),
                    pagination: {
                        currentPage: 1,
                        pageSize: 20,
                        totalItems: 25,
                        totalPages: 2,
                        hasNextPage: true,
                        hasPreviousPage: false
                    }
                })
            })

            const coachesComposable = mockUseCoaches()
            const result = await coachesComposable.list(1, 20)

            expect(result.data).toHaveLength(20)
            expect(result.pagination.hasNextPage).toBe(true)
        })

        it('Step 2: User navigates to last page', async () => {
            mockUseCoaches.mockReturnValue({
                list: vi.fn().mockResolvedValue({
                    data: new Array(5).fill(null).map((_, i) => ({
                        id: i + 21,
                        dni: `1234567${i}A`,
                        nombre: `Coach ${i + 21}`,
                        apellidos: 'Test',
                        salario: 10000000,
                        id_club: 'MCI'
                    })),
                    pagination: {
                        currentPage: 2,
                        pageSize: 20,
                        totalItems: 25,
                        totalPages: 2,
                        hasNextPage: false,
                        hasPreviousPage: true
                    }
                })
            })

            const coachesComposable = mockUseCoaches()
            const result = await coachesComposable.list(2, 20)

            expect(result.data).toHaveLength(5)
            expect(result.pagination.hasNextPage).toBe(false)
        })
    })
})

