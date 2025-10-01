/**
 * Vitest Setup - Configuración global para tests de integración
 * Reduce código boilerplate en cada archivo de test
 */

import { beforeEach, vi } from 'vitest'

/**
 * Limpia todos los mocks antes de cada test
 * Garantiza que cada test comience con un estado limpio
 */
beforeEach(() => {
    vi.clearAllMocks()
})

/**
 * Helper global para crear espías de window methods
 */
export const createWindowSpy = (method: string, returnValue: any = true) => {
    return vi.spyOn(window as any, method).mockReturnValue(returnValue)
}

/**
 * Helper global para simular delays (útil para tests de debounce)
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Helper global para esperar por el próximo tick
 */
export const nextTick = () => new Promise(resolve => setTimeout(resolve, 0))

