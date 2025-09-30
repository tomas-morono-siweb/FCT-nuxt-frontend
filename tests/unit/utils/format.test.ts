import { describe, it, expect } from 'vitest'
import { formatMillions, parseMillions } from '../../../app/utils/format'

describe('format.ts', () => {
    describe('formatMillions', () => {
        it('should format positive numbers correctly', () => {
            expect(formatMillions(1000000)).toBe('1M €')
            expect(formatMillions(50000000)).toBe('50M €')
            expect(formatMillions(150000000)).toBe('150M €')
        })

        it('should handle zero and null values', () => {
            expect(formatMillions(0)).toBe('0M €')
            expect(formatMillions(null)).toBe('0M €')
            expect(formatMillions(undefined)).toBe('0M €')
        })

        it('should handle decimal values', () => {
            expect(formatMillions(1500000)).toBe('1.5M €')
            expect(formatMillions(2500000)).toBe('2.5M €')
        })

        it('should handle negative values', () => {
            expect(formatMillions(-1000000)).toBe('-1M €')
            expect(formatMillions(-50000000)).toBe('-50M €')
        })
    })

    describe('parseMillions', () => {
        it('should parse formatted strings correctly', () => {
            expect(parseMillions('1M €')).toBe(1000000)
            expect(parseMillions('50M €')).toBe(50000000)
            expect(parseMillions('150M €')).toBe(150000000)
        })

        it('should handle decimal formatted strings', () => {
            expect(parseMillions('1.5M €')).toBe(1500000)
            expect(parseMillions('2.5M €')).toBe(2500000)
        })

        it('should handle empty and invalid strings', () => {
            expect(parseMillions('')).toBe(0)
            expect(parseMillions('invalid')).toBe(0)
            expect(parseMillions('M €')).toBe(0)
        })

        it('should handle strings with extra spaces', () => {
            expect(parseMillions('  1M €  ')).toBe(1000000)
            expect(parseMillions('50M€')).toBe(50000000)
        })

        it('should handle negative formatted strings', () => {
            expect(parseMillions('-1M €')).toBe(-1000000)
            expect(parseMillions('-50M €')).toBe(-50000000)
        })
    })

    describe('formatMillions and parseMillions integration', () => {
        it('should be reversible operations', () => {
            const originalValues = [1000000, 50000000, 150000000, 2500000, -1000000]

            originalValues.forEach(value => {
                const formatted = formatMillions(value)
                const parsed = parseMillions(formatted)
                expect(parsed).toBe(value)
            })
        })
    })
})
