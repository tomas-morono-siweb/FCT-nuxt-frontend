/**
 * Mock Helpers - Funciones para configurar mocks comunes
 * Reduce duplicación en la configuración de tests
 */

import { vi } from 'vitest'

/**
 * Configuración estándar de mock para usePlayers
 */
export const setupPlayersMock = (mockUsePlayers: any, options: {
    list?: any[]
    get?: any
    create?: any
    update?: any
    remove?: boolean
} = {}) => {
    mockUsePlayers.mockReturnValue({
        list: vi.fn().mockResolvedValue({
            data: options.list || [],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: options.list?.length || 0
            }
        }),
        get: vi.fn().mockResolvedValue(options.get || null),
        create: vi.fn().mockResolvedValue(options.create || null),
        update: vi.fn().mockResolvedValue(options.update || null),
        remove: vi.fn().mockResolvedValue(undefined)
    })
}

/**
 * Configuración estándar de mock para useCoaches
 */
export const setupCoachesMock = (mockUseCoaches: any, options: {
    list?: any[]
    get?: any
    create?: any
    update?: any
    remove?: boolean
} = {}) => {
    mockUseCoaches.mockReturnValue({
        list: vi.fn().mockResolvedValue({
            data: options.list || [],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: options.list?.length || 0
            }
        }),
        get: vi.fn().mockResolvedValue(options.get || null),
        create: vi.fn().mockResolvedValue(options.create || null),
        update: vi.fn().mockResolvedValue(options.update || null),
        remove: vi.fn().mockResolvedValue(undefined)
    })
}

/**
 * Configuración estándar de mock para useClubs
 */
export const setupClubsMock = (mockUseClubs: any, options: {
    list?: any[]
    get?: any
    getByIdClub?: any
    create?: any
    update?: any
    remove?: boolean
} = {}) => {
    mockUseClubs.mockReturnValue({
        list: vi.fn().mockResolvedValue({
            data: options.list || [],
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: options.list?.length || 0
            }
        }),
        get: vi.fn().mockResolvedValue(options.get || null),
        getByIdClub: vi.fn().mockResolvedValue(options.getByIdClub || null),
        create: vi.fn().mockResolvedValue(options.create || null),
        update: vi.fn().mockResolvedValue(options.update || null),
        remove: vi.fn().mockResolvedValue(undefined)
    })
}

/**
 * Configuración estándar de mock para useGlobalLoading
 */
export const setupGlobalLoadingMock = (mockUseGlobalLoading: any) => {
    mockUseGlobalLoading.mockReturnValue({
        withLoading: vi.fn().mockImplementation(async (fn: any) => await fn())
    })
}

/**
 * Mock de window.confirm
 */
export const mockConfirm = (returnValue: boolean = true) => {
    const mockFn = vi.spyOn(window, 'confirm').mockReturnValue(returnValue)
    return mockFn
}

/**
 * Restaurar todos los mocks
 */
export const restoreAllMocks = () => {
    vi.restoreAllMocks()
}

