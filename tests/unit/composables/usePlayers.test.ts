/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { usePlayers } from '../../../app/composables/usePlayers'
import type { Player } from '../../../app/interfaces/player'

// Mock de $fetch
const mockFetch = vi.fn()
    ; (globalThis as any).$fetch = mockFetch

describe('usePlayers', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('list', () => {
        it('should fetch players list with default parameters', async () => {
            const mockResponse = {
                players: [
                    { id: 1, nombre: 'Lionel', apellidos: 'Messi', salario: '50000000.00', dorsal: 10, club: 'PSG', entrenador: 'Mauricio Pochettino', id_club: 'psg-001' },
                    { id: 2, nombre: 'Cristiano', apellidos: 'Ronaldo', salario: '45000000.00', dorsal: 7, club: 'Al Nassr', entrenador: 'Rudi Garcia', id_club: 'aln-001' }
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

            const { list } = usePlayers()
            const result = await list()

            expect(mockFetch).toHaveBeenCalledWith('http://api.clubmanager.com/players', {
                query: { nombre: undefined, page: 1, pageSize: 20 }
            })

            expect(result.data).toHaveLength(2)
            expect(result.data[0].salario).toBe(50000000) // Convertido a number
            expect(result.data[0].entrenador).toBe('Mauricio Pochettino')
            expect(result.pagination.currentPage).toBe(1)
            expect(result.pagination.totalItems).toBe(2)
            expect(result.pagination.nextPage).toBe(null)
            expect(result.pagination.prevPage).toBe(null)
        })

        it('should fetch players list with search parameters', async () => {
            const mockResponse = {
                players: [{ id: 1, nombre: 'Lionel', apellidos: 'Messi', salario: '50000000.00', dorsal: 10, club: 'Paris Saint Germain', entrenador: 'Mauricio Pochettino', id_club: 'PSG' }],
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

            const { list } = usePlayers()
            const result = await list('Messi', 2, 5)

            expect(mockFetch).toHaveBeenCalledWith('http://api.clubmanager.com/players', {
                query: { nombre: 'Messi', page: 2, pageSize: 5 }
            })

            expect(result.data).toHaveLength(1)
            expect(result.data[0].nombre).toBe('Lionel')
            expect(result.data[0].salario).toBe(50000000) // Convertido a number
            expect(result.pagination.nextPage).toBe(null)
            expect(result.pagination.prevPage).toBe(1)
        })
    })

    describe('get', () => {
        it('should fetch a single player by id', async () => {
            const mockPlayer = {
                id: 1,
                nombre: 'Lionel',
                apellidos: 'Messi',
                salario: '50000000.00',
                dorsal: 10,
                club: 'PSG',
                entrenador: 'Mauricio Pochettino',
                id_club: 'psg-001'
            }

            mockFetch.mockResolvedValue(mockPlayer)

            const { get } = usePlayers()
            const result = await get(1)

            expect(mockFetch).toHaveBeenCalledWith('http://api.clubmanager.com/players/1')
            expect(result.salario).toBe(50000000) // Convertido a number
            expect(result.entrenador).toBe('Mauricio Pochettino')
        })
    })

    describe('data transformation', () => {
        it('should convert salario from string to number in list', async () => {
            const mockResponse = {
                players: [
                    { id: 1, nombre: 'Test', apellidos: 'Player', salario: '25000000.50', dorsal: 1, club: 'Test Club', entrenador: 'Test Coach', id_club: 'test-001' }
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

            const { list } = usePlayers()
            const result = await list()

            expect(result.data[0].salario).toBe(25000000.5)
            expect(typeof result.data[0].salario).toBe('number')
        })

        it('should convert salario from string to number in get', async () => {
            const mockPlayer = {
                id: 1,
                nombre: 'Test',
                apellidos: 'Player',
                salario: '30000000.00',
                dorsal: 1,
                club: 'Test Club',
                entrenador: 'Test Coach',
                id_club: 'test-001'
            }

            mockFetch.mockResolvedValue(mockPlayer)

            const { get } = usePlayers()
            const result = await get(1)

            expect(result.salario).toBe(30000000)
            expect(typeof result.salario).toBe('number')
        })

        it('should handle already numeric salario', async () => {
            const mockPlayer = {
                id: 1,
                nombre: 'Test',
                apellidos: 'Player',
                salario: 40000000, // Already a number
                dorsal: 1,
                club: 'Test Club',
                entrenador: 'Test Coach',
                id_club: 'test-001'
            }

            mockFetch.mockResolvedValue(mockPlayer)

            const { get } = usePlayers()
            const result = await get(1)

            expect(result.salario).toBe(40000000)
            expect(typeof result.salario).toBe('number')
        })
    })

    describe('create', () => {
        it('should create a new player', async () => {
            const newPlayer: Partial<Player> = {
                nombre: 'Kylian',
                apellidos: 'Mbappé',
                salario: 40000000,
                dorsal: 7,
                club: 'Real Madrid',
                id_club: 'rm-001'
            }

            const createdPlayer: Player = {
                id: 3,
                ...newPlayer
            } as Player

            mockFetch.mockResolvedValue(createdPlayer)

            const { create } = usePlayers()
            const result = await create(newPlayer)

            expect(mockFetch).toHaveBeenCalledWith('http://api.clubmanager.com/players', {
                method: 'POST',
                body: newPlayer
            })

            expect(result).toEqual(createdPlayer)
        })
    })

    describe('update', () => {
        it('should update an existing player', async () => {
            const updateData: Partial<Player> = {
                salario: 60000000
            }

            const updatedPlayer: Player = {
                id: 1,
                nombre: 'Lionel',
                apellidos: 'Messi',
                salario: 60000000,
                dorsal: 10,
                club: 'PSG',
                id_club: 'psg-001'
            }

            mockFetch.mockResolvedValue(updatedPlayer)

            const { update } = usePlayers()
            const result = await update(1, updateData)

            expect(mockFetch).toHaveBeenCalledWith('http://api.clubmanager.com/players/1', {
                method: 'PUT',
                body: updateData
            })

            expect(result).toEqual(updatedPlayer)
        })
    })

    describe('remove', () => {
        it('should delete a player', async () => {
            mockFetch.mockResolvedValue(undefined)

            const { remove } = usePlayers()
            await remove(1)

            expect(mockFetch).toHaveBeenCalledWith('http://api.clubmanager.com/players/1', {
                method: 'DELETE'
            })
        })
    })
})
