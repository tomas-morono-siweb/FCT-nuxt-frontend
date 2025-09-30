import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        // Entorno de testing
        environment: 'happy-dom',

        // Configuración global para tests
        globals: true,

        // Archivos de test a incluir
        include: [
            'tests/**/*.{test,spec}.{js,ts,vue}',
            'app/**/*.{test,spec}.{js,ts,vue}'
        ],

        // Archivos a excluir
        exclude: [
            'node_modules',
            'dist',
            '.output',
            'coverage'
        ],

        // Configuración de cobertura
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'tests/',
                '**/*.d.ts',
                '**/*.config.*',
                '.output/',
                'coverage/'
            ],
            thresholds: {
                global: {
                    branches: 70,
                    functions: 70,
                    lines: 70,
                    statements: 70
                }
            }
        },

        // Configuración específica para Vue
        setupFiles: ['./tests/setup.ts']
    },

    // Configuración específica para Nuxt
    define: {
        'process.env.NODE_ENV': '"test"'
    }
})
