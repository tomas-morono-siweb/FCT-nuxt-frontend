// API Configuration
export const API_CONFIG = {
    BASE_URL: 'http://clubmanager.com',
    ENDPOINTS: {
        PLAYERS: '/players',
        COACHES: '/coaches',
        CLUBS: '/clubs'
    }
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to build API URLs with ID
export const buildApiUrlWithId = (endpoint: string, id: number | string): string => {
    return `${API_CONFIG.BASE_URL}${endpoint}/${id}`;
};
