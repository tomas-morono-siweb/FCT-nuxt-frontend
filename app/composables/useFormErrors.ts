import type { BackendValidationErrors, BackendErrorResponse } from "~/interfaces/validation";

export const useFormErrors = () => {
    // Estado reactivo para los errores de campo
    const fieldErrors = ref<BackendValidationErrors>({});
    const generalError = ref<string>("");

    // Función para limpiar todos los errores
    const clearErrors = () => {
        fieldErrors.value = {};
        generalError.value = "";
    };

    // Función para limpiar el error de un campo específico
    const clearFieldError = (fieldName: string) => {
        if (fieldErrors.value[fieldName]) {
            delete fieldErrors.value[fieldName];
        }
    };

    // Función para establecer errores desde la respuesta del backend
    const setErrors = (error: any) => {
        clearErrors();

        if (!error) return;

        const errorData = error as BackendErrorResponse;

        // Caso 1: Error viene envuelto en data (formato real del backend)
        if (errorData.data?.error) {
            const dataError = errorData.data.error;

            // Si data.error es un objeto, son errores por campo
            if (typeof dataError === 'object') {
                fieldErrors.value = { ...dataError };
            }
            // Si data.error es string, es un error general
            else if (typeof dataError === 'string') {
                generalError.value = dataError;
            }
        }
        // Caso 2: Errores directos por campo
        else if (errorData.errores && typeof errorData.errores === 'object') {
            fieldErrors.value = { ...errorData.errores };
        }
        // Caso 3: Error general directo
        else if (errorData.error && typeof errorData.error === 'string') {
            generalError.value = errorData.error;
        }
        // Caso 4: Error directo como objeto (errores por campo)
        else if (errorData.error && typeof errorData.error === 'object') {
            fieldErrors.value = { ...errorData.error };
        }
        // Fallback
        else {
            if (typeof error === 'string') {
                generalError.value = error;
            } else {
                generalError.value = "Ha ocurrido un error inesperado";
            }
        }
    };

    // Función para obtener el error de un campo específico
    const getFieldError = (fieldName: string): string => {
        return fieldErrors.value[fieldName] || "";
    };

    // Función para verificar si hay errores
    const hasErrors = computed(() => {
        return Object.keys(fieldErrors.value).length > 0 || generalError.value !== "";
    });

    // Función para verificar si un campo específico tiene error
    const hasFieldError = (fieldName: string): boolean => {
        return !!fieldErrors.value[fieldName];
    };

    return {
        fieldErrors: readonly(fieldErrors),
        generalError: readonly(generalError),
        clearErrors,
        clearFieldError,
        setErrors,
        getFieldError,
        hasErrors,
        hasFieldError,
    };
};
