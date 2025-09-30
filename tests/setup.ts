import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Configuración global para Vue Test Utils
config.global.mocks = {
    // Mock de $fetch para tests
    $fetch: vi.fn(),

    // Mock de useRoute
    $route: {
        params: {},
        query: {},
        path: '/',
        name: 'index'
    },

    // Mock de useRouter
    $router: {
        push: vi.fn(),
        replace: vi.fn(),
        go: vi.fn(),
        back: vi.fn(),
        forward: vi.fn()
    }
}

// Mock de Nuxt composables comunes
vi.mock('#app', () => ({
    useRoute: () => ({
        params: {},
        query: {},
        path: '/',
        name: 'index'
    }),
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        go: vi.fn(),
        back: vi.fn(),
        forward: vi.fn()
    }),
    navigateTo: vi.fn(),
    useNuxtApp: () => ({
        $router: {
            push: vi.fn(),
            replace: vi.fn()
        }
    })
}))

    // Mock de $fetch global
    ; (globalThis as any).$fetch = vi.fn()

// Configuración de entorno para tests
beforeEach(() => {
    // Limpiar mocks antes de cada test
    vi.clearAllMocks()
})

// Configuración global para Vue
config.global.stubs = {
    // Stub para componentes de Nuxt que no necesitamos testear
    'NuxtLink': true,
    'NuxtPage': true,
    'ClientOnly': true
}
