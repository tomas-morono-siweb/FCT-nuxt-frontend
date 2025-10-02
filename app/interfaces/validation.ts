// Interfaz para errores del backend
export interface BackendError {
    error: string;
}

// Interfaz para errores de validación del backend (mantener compatibilidad)
export interface ValidationError {
    message: string;
    errores?: {
        [field: string]: string[];
    };
    statusCode?: number;
}

// Interfaz para errores de campo específico
export interface FieldError {
    field: string;
    message: string;
}

// Nueva interfaz para errores de validación del backend con formato { campo => mensaje }
export interface BackendValidationErrors {
    [fieldName: string]: string;
}

// Interfaz para la respuesta de error completa del backend
export interface BackendErrorResponse {
    error?: string | BackendValidationErrors; // Error general (string) o errores por campo (objeto)
    errores?: BackendValidationErrors;        // Errores por campo { "campo" => "mensaje" }
    data?: {
        error?: string | BackendValidationErrors; // El formato real viene envuelto en data
    };
}