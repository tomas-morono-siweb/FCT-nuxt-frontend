import { ref } from 'vue';

// Estado global de carga
const isLoading = ref(false);
const loadingMessage = ref('Cargando...');

// Contador de operaciones en curso
let loadingOperations = 0;

export const useGlobalLoading = () => {
    const startLoading = (message = 'Cargando...') => {
        loadingOperations++;
        loadingMessage.value = message;
        isLoading.value = true;
    };

    const stopLoading = () => {
        loadingOperations = Math.max(0, loadingOperations - 1);

        // Solo parar la carga cuando no hay más operaciones
        if (loadingOperations === 0) {
            isLoading.value = false;
        }
    };

    const withLoading = async <T>(
        operation: () => Promise<T>,
        message = 'Cargando...'
    ): Promise<T> => {
        try {
            startLoading(message);
            const result = await operation();
            return result;
        } finally {
            stopLoading();
        }
    };

    const resetLoading = () => {
        loadingOperations = 0;
        isLoading.value = false;
        loadingMessage.value = 'Cargando...';
    };

    return {
        // Estado reactivo
        isLoading: readonly(isLoading),
        loadingMessage: readonly(loadingMessage),

        // Métodos
        startLoading,
        stopLoading,
        withLoading,
        resetLoading,
    };
};
