import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCoaches } from '../../../app/composables/useCoaches'
import type { Coach } from '../../../app/interfaces/coach'

// Mock de $fetch
const mockFetch = vi.fn()
    ; (globalThis as any).$fetch = mockFetch

describe('useCoaches', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('list', () => {
        it('should fetch coaches list with default parameters', async () => {
            const mockResponse = {
                coaches: [
                    { id: 1, dni: '12345678A', nombre: 'Pep', apellidos: 'Guardiola', salario: '20000000.00', id_club: 'MCI' },
                    { id: 2, dni: '87654321B', nombre: 'Carlo', apellidos: 'Ancelotti', salario: '18000000.00', id_club: 'RM' }
                ],
                pagination: {
                    current_page: 1,
                    per_page: 20,
                    total_items: 2,
                    total_pages: 1,
                    has_next_page: false,
                    has_prev_page: false,
                    next_page: null,
                    prev_page: null
                }
            }

            mockFetch.mockResolvedValue(mockResponse)

            const { list } = useCoaches()
            const result = await list()

            expect(mockFetch).toHaveBeenCalledWith('/api/coaches', {
                query: { page: 1, pageSize: 20 }
            })

            expect(result.data).toHaveLength(2)
            expect(result.data[0].salario).toBe(20000000) // Convertido a number
            expect(result.data[0].id_club).toBe('MCI')
            expect(result.pagination.currentPage).toBe(1)
            expect(result.pagination.totalItems).toBe(2)
            expect(result.pagination.nextPage).toBe(null)
            expect(result.pagination.prevPage).toBe(null)
        })

        it('should fetch coaches list with custom parameters', async () => {
            const mockResponse = {
                coaches: [{ id: 1, dni: '12345678A', nombre: 'Pep', apellidos: 'Guardiola', salario: '20000000.00', id_club: 'MCI' }],
                pagination: {
                    current_page: 2,
                    per_page: 5,
                    total_items: 1,
                    total_pages: 1,
                    has_next_page: false,
                    has_prev_page: true,
                    next_page: null,
                    prev_page: 1
                }
            }

            mockFetch.mockResolvedValue(mockResponse)

            const { list } = useCoaches()
            const result = await list(2, 5)

            expect(mockFetch).toHaveBeenCalledWith('/api/coaches', {
                query: { page: 2, pageSize: 5 }
            })

            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toBe('Pep')
            expect(result.data[0].salario).toBe(20000000) // Convertido a number
            expect(result.pagination.nextPage).toBe(null)
            expect(result.pagination.prevPage).toBe(1)
        })
    })

    describe('get', () => {
        it('should fetch a single coach by id', async () => {
            const mockCoach = {
                id: 1,
                dni: '12345678A',
                nombre: 'Pep',
                apellidos: 'Guardiola',
                salario: '20000000.00',
                id_club: 'MCI'
            }

            mockFetch.mockResolvedValue(mockCoach)

            const { get } = useCoaches()
            const result = await get(1)

            expect(mockFetch).toHaveBeenCalledWith('/api/coaches/1')
            expect(result.salario).toBe(20000000) // Convertido a number
            expect(result.id_club).toBe('MCI')
        })
    })

    describe('data transformation', () => {
        it('should convert salario from string to number in list', async () => {
            const mockResponse = {
                coaches: [
                    { id: 1, dni: '12345678A', nombre: 'Test', apellidos: 'Coach', salario: '15000000.50', id_club: 'TEST' }
                ],
                pagination: {
                    current_page: 1,
                    per_page: 20,
                    total_items: 1,
                    total_pages: 1,
                    has_next_page: false,
                    has_prev_page: false,
                    next_page: null,
                    prev_page: null
                }
            }

            mockFetch.mockResolvedValue(mockResponse)

            const { list } = useCoaches()
            const result = await list()

            expect(result.data[0].salario).toBe(15000000.5)
            expect(typeof result.data[0].salario).toBe('number')
        })

        it('should convert salario from string to number in get', async () => {
            const mockCoach = {
                id: 1,
                dni: '12345678A',
                nombre: 'Test',
                apellidos: 'Coach',
                salario: '30000000.00',
                id_club: 'TEST'
            }

            mockFetch.mockResolvedValue(mockCoach)

            const { get } = useCoaches()
            const result = await get(1)

            expect(result.salario).toBe(30000000)
            expect(typeof result.salario).toBe('number')
        })
    })

    describe('create', () => {
        it('should create a new coach', async () => {
            const newCoach: Partial<Coach> = {
                dni: '11111111C',
                nombre: 'Jurgen',
                apellidos: 'Klopp',
                salario: 15000000,
                id_club: 'liv-001'
            }

            const createdCoach: Coach = {
                id: 3,
                ...newCoach
            } as Coach

            mockFetch.mockResolvedValue(createdCoach)

            const { create } = useCoaches()
            const result = await create(newCoach)

            expect(mockFetch).toHaveBeenCalledWith('/api/coaches', {
                method: 'POST',
                body: newCoach
            })

            expect(result).toEqual(createdCoach)
        })
    })

    describe('update', () => {
        it('should update an existing coach', async () => {
            const updateData: Partial<Coach> = {
                salario: 25000000
            }

            const updatedCoach: Coach = {
                id: 1,
                dni: '12345678A',
                nombre: 'Pep',
                apellidos: 'Guardiola',
                salario: 25000000,
                id_club: 'mci-001'
            }

            mockFetch.mockResolvedValue(updatedCoach)

            const { update } = useCoaches()
            const result = await update(1, updateData)

            expect(mockFetch).toHaveBeenCalledWith('/api/coaches/1', {
                method: 'PUT',
                body: updateData
            })

            expect(result).toEqual(updatedCoach)
        })
    })

    describe('remove', () => {
        it('should delete a coach', async () => {
            mockFetch.mockResolvedValue(undefined)

            const { remove } = useCoaches()
            await remove(1)

            expect(mockFetch).toHaveBeenCalledWith('/api/coaches/1', {
                method: 'DELETE'
            })
        })
    })
})
