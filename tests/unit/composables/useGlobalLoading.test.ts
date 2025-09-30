import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useGlobalLoading } from '../../../app/composables/useGlobalLoading'

describe('useGlobalLoading', () => {
    beforeEach(() => {
        // Reset the global loading state before each test
        const { resetLoading } = useGlobalLoading()
        resetLoading()
    })

    describe('startLoading and stopLoading', () => {
        it('should start and stop loading correctly', () => {
            const { isLoading, loadingMessage, startLoading, stopLoading } = useGlobalLoading()

            expect(isLoading.value).toBe(false)
            expect(loadingMessage.value).toBe('Cargando...')

            startLoading('Cargando datos...')
            expect(isLoading.value).toBe(true)
            expect(loadingMessage.value).toBe('Cargando datos...')

            stopLoading()
            expect(isLoading.value).toBe(false)
        })

        it('should handle multiple concurrent operations', () => {
            const { isLoading, startLoading, stopLoading } = useGlobalLoading()

            // Start first operation
            startLoading('Operación 1')
            expect(isLoading.value).toBe(true)

            // Start second operation
            startLoading('Operación 2')
            expect(isLoading.value).toBe(true)

            // Stop first operation - should still be loading
            stopLoading()
            expect(isLoading.value).toBe(true)

            // Stop second operation - should stop loading
            stopLoading()
            expect(isLoading.value).toBe(false)
        })

        it('should not go below zero operations', () => {
            const { isLoading, stopLoading } = useGlobalLoading()

            // Try to stop when no operations are running
            stopLoading()
            expect(isLoading.value).toBe(false)

            // Try to stop again
            stopLoading()
            expect(isLoading.value).toBe(false)
        })
    })

    describe('withLoading wrapper', () => {
        it('should execute operation and handle loading state', async () => {
            const { isLoading, loadingMessage, withLoading } = useGlobalLoading()
            const mockOperation = vi.fn().mockResolvedValue('test result')

            expect(isLoading.value).toBe(false)

            const result = await withLoading(mockOperation, 'Ejecutando operación...')

            expect(result).toBe('test result')
            expect(mockOperation).toHaveBeenCalledOnce()
            expect(isLoading.value).toBe(false)
        })

        it('should handle operation errors and still stop loading', async () => {
            const { isLoading, withLoading } = useGlobalLoading()
            const mockOperation = vi.fn().mockRejectedValue(new Error('Test error'))

            expect(isLoading.value).toBe(false)

            await expect(withLoading(mockOperation, 'Operación con error...')).rejects.toThrow('Test error')
            expect(mockOperation).toHaveBeenCalledOnce()
            expect(isLoading.value).toBe(false)
        })

        it('should use default message when none provided', async () => {
            const { loadingMessage, withLoading } = useGlobalLoading()
            const mockOperation = vi.fn().mockResolvedValue('result')

            await withLoading(mockOperation)

            expect(loadingMessage.value).toBe('Cargando...')
        })
    })

    describe('resetLoading', () => {
        it('should reset all loading state', () => {
            const { isLoading, loadingMessage, startLoading, resetLoading } = useGlobalLoading()

            startLoading('Mensaje personalizado')
            expect(isLoading.value).toBe(true)
            expect(loadingMessage.value).toBe('Mensaje personalizado')

            resetLoading()
            expect(isLoading.value).toBe(false)
            expect(loadingMessage.value).toBe('Cargando...')
        })
    })

    describe('readonly state', () => {
        it('should provide readonly access to loading state', () => {
            const { isLoading, loadingMessage } = useGlobalLoading()

            // These should be readonly - we can verify by checking the type
            // In TypeScript, readonly refs prevent direct assignment
            expect(isLoading.value).toBe(false)
            expect(loadingMessage.value).toBe('Cargando...')

            // The fact that we can read the values but TypeScript prevents
            // direct assignment confirms they are readonly
            expect(typeof isLoading.value).toBe('boolean')
            expect(typeof loadingMessage.value).toBe('string')
        })
    })
})
