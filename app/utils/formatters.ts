/**
 * Utility functions for formatting numbers and currency
 */

/**
 * Formats a number with European style (dots as thousands separator)
 * @param value - The number to format
 * @param currency - Whether to add currency symbol (default: true)
 * @returns Formatted string with European number format
 */
export const formatCurrency = (value: number | undefined, currency: boolean = true): string => {
    if (!value && value !== 0) return "Sin valor";

    // Format with dot as thousands separator (European style)
    const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return currency ? `${formatted} €` : formatted;
};

/**
 * Formats a salary specifically
 * @param salary - The salary amount to format
 * @returns Formatted salary string or default message
 */
export const formatSalary = (salary: number | undefined): string => {
    if (!salary) return "Sin salario";
    return formatCurrency(salary);
};

/**
 * Formats budget amounts
 * @param budget - The budget amount to format
 * @param currency - Whether to add currency symbol (default: true)
 * @returns Formatted budget string or default message
 */
export const formatBudget = (budget: number | undefined, currency: boolean = true): string => {
    if (!budget) return "Sin presupuesto";
    return formatCurrency(budget, currency);
};
