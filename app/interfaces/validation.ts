// Interfaz para errores del backend
export interface BackendError {
    error: string;
}

// Interfaz para errores de validación del backend (mantener compatibilidad)
export interface ValidationError {
    message: string;
    errors?: {
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
    error?: string;                    // Error general con mensaje
    errores?: BackendValidationErrors; // Errores por campo { "campo" => "mensaje" }
}