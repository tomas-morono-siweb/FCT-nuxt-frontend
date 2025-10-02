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

        // El backend envía directamente el formato esperado
        const errorData = error as BackendErrorResponse;

        // Errores de validación por campo (formato: { "campo" => "mensaje" })
        if (errorData.errores && typeof errorData.errores === 'object') {
            fieldErrors.value = { ...errorData.errores };
        }

        // Error general
        if (errorData.error) {
            generalError.value = errorData.error;
        }

        // Fallback si no hay estructura reconocida
        if (!errorData.error && !errorData.errores) {
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
