import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useClubs } from '../../../app/composables/useClubs'
import type { Club } from '../../../app/interfaces/club'

// Mock de $fetch
const mockFetch = vi.fn()
    ; (globalThis as any).$fetch = mockFetch

describe('useClubs', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('list', () => {
        it('should fetch clubs list with default parameters', async () => {
            const mockResponse = {
                clubs: [
                    {
                        id: 1,
                        id_club: 'rm-001',
                        nombre: 'Real Madrid',
                        fundacion: 1902,
                        ciudad: 'Madrid',
                        estadio: 'Santiago Bernabéu',
                        presupuesto: 500000000,
                        presupuesto_restante: 300000000
                    },
                    {
                        id: 2,
                        id_club: 'fcb-001',
                        nombre: 'FC Barcelona',
                        fundacion: 1899,
                        ciudad: 'Barcelona',
                        estadio: 'Camp Nou',
                        presupuesto: 400000000,
                        presupuesto_restante: 250000000
                    }
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

            const { list } = useClubs()
            const result = await list()

            expect(mockFetch).toHaveBeenCalledWith('/api/clubs', {
                query: { page: 1, pageSize: 10 }
            })

            expect(result.data).toEqual(mockResponse.clubs)
            expect(result.pagination.currentPage).toBe(1)
            expect(result.pagination.totalItems).toBe(2)
        })

        it('should fetch clubs list with custom parameters', async () => {
            const mockResponse = {
                clubs: [{
                    id: 1,
                    id_club: 'rm-001',
                    nombre: 'Real Madrid',
                    fundacion: 1902,
                    ciudad: 'Madrid',
                    estadio: 'Santiago Bernabéu',
                    presupuesto: 500000000,
                    presupuesto_restante: 300000000
                }],
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

            const { list } = useClubs()
            const result = await list(2, 5)

            expect(mockFetch).toHaveBeenCalledWith('/api/clubs', {
                query: { page: 2, pageSize: 5 }
            })

            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toBe('Real Madrid')
        })
    })

    describe('get', () => {
        it('should fetch a single club by id', async () => {
            const mockClub: Club = {
                id: 1,
                id_club: 'rm-001',
                nombre: 'Real Madrid',
                fundacion: 1902,
                ciudad: 'Madrid',
                estadio: 'Santiago Bernabéu',
                presupuesto: 500000000,
                presupuesto_restante: 300000000
            }

            mockFetch.mockResolvedValue(mockClub)

            const { get } = useClubs()
            const result = await get(1)

            expect(mockFetch).toHaveBeenCalledWith('/api/clubs/1')
            expect(result).toEqual(mockClub)
        })
    })

    describe('create', () => {
        it('should create a new club', async () => {
            const newClub: Partial<Club> = {
                id_club: 'atm-001',
                nombre: 'Atlético de Madrid',
                fundacion: 1903,
                ciudad: 'Madrid',
                estadio: 'Wanda Metropolitano',
                presupuesto: 200000000,
                presupuesto_restante: 150000000
            }

            const createdClub: Club = {
                id: 3,
                ...newClub
            } as Club

            mockFetch.mockResolvedValue(createdClub)

            const { create } = useClubs()
            const result = await create(newClub)

            expect(mockFetch).toHaveBeenCalledWith('/api/clubs', {
                method: 'POST',
                body: newClub
            })

            expect(result).toEqual(createdClub)
        })
    })

    describe('update', () => {
        it('should update an existing club', async () => {
            const updateData: Partial<Club> = {
                presupuesto: 600000000
            }

            const updatedClub: Club = {
                id: 1,
                id_club: 'rm-001',
                nombre: 'Real Madrid',
                fundacion: 1902,
                ciudad: 'Madrid',
                estadio: 'Santiago Bernabéu',
                presupuesto: 600000000,
                presupuesto_restante: 300000000
            }

            mockFetch.mockResolvedValue(updatedClub)

            const { update } = useClubs()
            const result = await update(1, updateData)

            expect(mockFetch).toHaveBeenCalledWith('/api/clubs/1', {
                method: 'PUT',
                body: updateData
            })

            expect(result).toEqual(updatedClub)
        })
    })

    describe('remove', () => {
        it('should delete a club', async () => {
            mockFetch.mockResolvedValue(undefined)

            const { remove } = useClubs()
            await remove(1)

            expect(mockFetch).toHaveBeenCalledWith('/api/clubs/1', {
                method: 'DELETE'
            })
        })
    })
})
