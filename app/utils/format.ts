/**
 * Formatea un valor numérico en millones de euros
 * @param value - Valor numérico en euros
 * @returns String formateado como "100M €"
 */
export function formatMillions(value: number | undefined | null): string {
    if (!value || value === 0) return '0M €';

    const millions = value / 1_000_000;
    return `${millions}M €`;
}

/**
 * Convierte un string formateado "100M €" de vuelta a número
 * @param formatted - String formateado como "100M €"
 * @returns Número en euros
 */
export function parseMillions(formatted: string): number {
    if (!formatted || formatted === '') return 0;

    // Remover "M €" y espacios
    const cleanValue = formatted.replace(/M\s*€/g, '').trim();
    const numericValue = parseFloat(cleanValue);

    if (isNaN(numericValue)) return 0;

    return numericValue * 1_000_000;
}
