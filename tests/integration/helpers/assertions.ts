/**
 * Assertion Helpers - Funciones de validación comunes
 * Agrupa validaciones repetitivas en funciones reutilizables
 */

import { expect } from 'vitest'

/**
 * Valida estructura de paginación
 */
export const assertPaginationStructure = (pagination: any) => {
    expect(pagination).toHaveProperty('currentPage')
    expect(pagination).toHaveProperty('pageSize')
    expect(pagination).toHaveProperty('totalItems')
    expect(pagination).toHaveProperty('totalPages')
    expect(pagination).toHaveProperty('hasNextPage')
    expect(pagination).toHaveProperty('hasPreviousPage')
}

/**
 * Valida estructura de jugador
 */
export const assertPlayerStructure = (player: any) => {
    expect(player).toHaveProperty('id')
    expect(player).toHaveProperty('nombre')
    expect(player).toHaveProperty('apellidos')
    expect(player).toHaveProperty('dorsal')
    expect(player).toHaveProperty('salario')
    expect(player).toHaveProperty('club')
    expect(player).toHaveProperty('id_club')
}

/**
 * Valida estructura de entrenador
 */
export const assertCoachStructure = (coach: any) => {
    expect(coach).toHaveProperty('id')
    expect(coach).toHaveProperty('dni')
    expect(coach).toHaveProperty('nombre')
    expect(coach).toHaveProperty('apellidos')
    expect(coach).toHaveProperty('salario')
    expect(coach).toHaveProperty('id_club')
}

/**
 * Valida estructura de club
 */
export const assertClubStructure = (club: any) => {
    expect(club).toHaveProperty('id')
    expect(club).toHaveProperty('id_club')
    expect(club).toHaveProperty('nombre')
    expect(club).toHaveProperty('fundacion')
    expect(club).toHaveProperty('ciudad')
    expect(club).toHaveProperty('estadio')
    expect(club).toHaveProperty('presupuesto')
    expect(club).toHaveProperty('presupuesto_restante')
}

/**
 * Valida rango de dorsal
 */
export const assertDorsalRange = (dorsal: number) => {
    expect(dorsal).toBeGreaterThan(0)
    expect(dorsal).toBeLessThanOrEqual(99)
}

/**
 * Valida salario positivo
 */
export const assertPositiveSalary = (salario: number) => {
    expect(salario).toBeGreaterThan(0)
}

/**
 * Valida formato DNI
 */
export const assertDNIFormat = (dni: string) => {
    expect(dni).toMatch(/^\d{8}[A-Z]$/)
}

/**
 * Valida año de fundación
 */
export const assertFundacionYear = (fundacion: number) => {
    const currentYear = new Date().getFullYear()
    expect(fundacion).toBeGreaterThan(1800)
    expect(fundacion).toBeLessThanOrEqual(currentYear)
}

/**
 * Valida código de club
 */
export const assertClubCodeFormat = (id_club: string) => {
    expect(id_club).toMatch(/^[A-Z]+$/)
}

/**
 * Valida breadcrumbs
 */
export const assertBreadcrumbStructure = (breadcrumbs: any[], expectedLength: number) => {
    expect(breadcrumbs).toHaveLength(expectedLength)
    breadcrumbs.forEach(breadcrumb => {
        expect(breadcrumb).toHaveProperty('label')
        expect(breadcrumb).toHaveProperty('to')
        expect(breadcrumb).toHaveProperty('icon')
    })
}

/**
 * Valida que un composable fue llamado correctamente
 */
export const assertComposableCalled = (composable: any, method: string, ...args: any[]) => {
    expect(composable[method]).toHaveBeenCalledWith(...args)
}

/**
 * Valida formato de salario
 */
export const assertSalaryFormat = (formatted: string) => {
    expect(formatted).toMatch(/€$/)
    expect(formatted.length).toBeGreaterThan(2)
}

