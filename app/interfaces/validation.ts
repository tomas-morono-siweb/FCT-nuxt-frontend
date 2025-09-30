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
