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
                    { id: 1, dni: '12345678A', nombre: 'Pep', apellidos: 'Guardiola', salario: 20000000, id_club: 'mci-001' },
                    { id: 2, dni: '87654321B', nombre: 'Carlo', apellidos: 'Ancelotti', salario: 18000000, id_club: 'rm-001' }
                ],
                pagination: {
                    current_page: 1,
                    per_page: 10,
                    total_items: 2,
                    total_pages: 1,
                    has_next_page: false,
                    has_prev_page: false
                }
            }

            mockFetch.mockResolvedValue(mockResponse)

            const { list } = useCoaches()
            const result = await list()

            expect(mockFetch).toHaveBeenCalledWith('/api/coaches', {
                query: { page: 1, pageSize: 10 }
            })

            expect(result.data).toEqual(mockResponse.coaches)
            expect(result.pagination.currentPage).toBe(1)
            expect(result.pagination.totalItems).toBe(2)
        })

        it('should fetch coaches list with custom parameters', async () => {
            const mockResponse = {
                coaches: [{ id: 1, dni: '12345678A', nombre: 'Pep', apellidos: 'Guardiola', salario: 20000000, id_club: 'mci-001' }],
                pagination: {
                    current_page: 2,
                    per_page: 5,
                    total_items: 1,
                    total_pages: 1,
                    has_next_page: false,
                    has_prev_page: true
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
        })
    })

    describe('get', () => {
        it('should fetch a single coach by id', async () => {
            const mockCoach: Coach = {
                id: 1,
                dni: '12345678A',
                nombre: 'Pep',
                apellidos: 'Guardiola',
                salario: 20000000,
                id_club: 'mci-001'
            }

            mockFetch.mockResolvedValue(mockCoach)

            const { get } = useCoaches()
            const result = await get(1)

            expect(mockFetch).toHaveBeenCalledWith('/api/coaches/1')
            expect(result).toEqual(mockCoach)
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
