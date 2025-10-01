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
                        id_club: 'RM',
                        nombre: 'Real Madrid',
                        fundacion: 1902,
                        ciudad: 'Madrid',
                        estadio: 'Santiago Bernabéu',
                        presupuesto: '500000000.00',
                        presupuesto_restante: 300000000,
                        entrenador: 'Carlo Ancelotti',
                        jugadores: ['Vinicius Junior', 'Jude Bellingham']
                    },
                    {
                        id: 2,
                        id_club: 'FCB',
                        nombre: 'FC Barcelona',
                        fundacion: 1899,
                        ciudad: 'Barcelona',
                        estadio: 'Camp Nou',
                        presupuesto: '400000000.00',
                        presupuesto_restante: 250000000,
                        entrenador: 'Xavi Hernández',
                        jugadores: ['Robert Lewandowski', 'Pedri González']
                    }
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

            const { list } = useClubs()
            const result = await list()

            expect(mockFetch).toHaveBeenCalledWith('/api/clubs', {
                query: { page: 1, pageSize: 20 }
            })

            expect(result.data).toHaveLength(2)
            expect(result.data[0].presupuesto).toBe(500000000) // Convertido a number
            expect(result.data[0].entrenador).toBe('Carlo Ancelotti')
            expect(result.data[0].jugadores).toEqual(['Vinicius Junior', 'Jude Bellingham'])
            expect(result.pagination.currentPage).toBe(1)
            expect(result.pagination.totalItems).toBe(2)
            expect(result.pagination.nextPage).toBe(null)
            expect(result.pagination.prevPage).toBe(null)
        })

        it('should fetch clubs list with custom parameters', async () => {
            const mockResponse = {
                clubs: [{
                    id: 1,
                    id_club: 'RM',
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
            const mockClub = {
                id: 1,
                id_club: 'RM',
                nombre: 'Real Madrid',
                fundacion: 1902,
                ciudad: 'Madrid',
                estadio: 'Santiago Bernabéu',
                presupuesto: '500000000.00',
                presupuesto_restante: 300000000,
                entrenador: 'Carlo Ancelotti',
                jugadores: ['Vinicius Junior', 'Jude Bellingham']
            }

            mockFetch.mockResolvedValue(mockClub)

            const { get } = useClubs()
            const result = await get(1)

            expect(mockFetch).toHaveBeenCalledWith('/api/clubs/1')
            expect(result.presupuesto).toBe(500000000) // Convertido a number
            expect(result.entrenador).toBe('Carlo Ancelotti')
            expect(result.jugadores).toEqual(['Vinicius Junior', 'Jude Bellingham'])
        })
    })

    describe('data transformation', () => {
        it('should convert presupuesto from string to number in list', async () => {
            const mockResponse = {
                clubs: [
                    {
                        id: 1,
                        id_club: 'TEST',
                        nombre: 'Test Club',
                        fundacion: 1900,
                        ciudad: 'Test City',
                        estadio: 'Test Stadium',
                        presupuesto: '250000000.50',
                        presupuesto_restante: 200000000,
                        entrenador: 'Test Coach',
                        jugadores: ['Test Player']
                    }
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

            const { list } = useClubs()
            const result = await list()

            expect(result.data[0].presupuesto).toBe(250000000.5)
            expect(typeof result.data[0].presupuesto).toBe('number')
        })

        it('should normalize jugadores field to array', async () => {
            const mockResponse = {
                clubs: [
                    {
                        id: 1,
                        id_club: 'TEST',
                        nombre: 'Test Club',
                        fundacion: 1900,
                        ciudad: 'Test City',
                        estadio: 'Test Stadium',
                        presupuesto: '100000000.00',
                        presupuesto_restante: 50000000,
                        entrenador: 'Test Coach',
                        jugadores: 'Sin jugadores' // String instead of array
                    }
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

            const { list } = useClubs()
            const result = await list()

            expect(result.data[0].jugadores).toEqual(['Sin jugadores'])
            expect(Array.isArray(result.data[0].jugadores)).toBe(true)
        })

        it('should handle empty jugadores field', async () => {
            const mockResponse = {
                clubs: [
                    {
                        id: 1,
                        id_club: 'TEST',
                        nombre: 'Test Club',
                        fundacion: 1900,
                        ciudad: 'Test City',
                        estadio: 'Test Stadium',
                        presupuesto: '100000000.00',
                        presupuesto_restante: 50000000,
                        entrenador: 'Test Coach',
                        jugadores: null // Null value
                    }
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

            const { list } = useClubs()
            const result = await list()

            expect(result.data[0].jugadores).toEqual([])
            expect(Array.isArray(result.data[0].jugadores)).toBe(true)
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
